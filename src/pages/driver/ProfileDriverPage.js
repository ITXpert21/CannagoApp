
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  View
} from 'react-native';

import Tabs from '../../components/driver/tab/Tabs';
import ToggleSwitch from 'toggle-switch-react-native'
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import userService from '../../services/userService';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Textarea from 'react-native-textarea';
import cartService from '../../services/cartService';
import SendSMS from 'react-native-sms';
import call from 'react-native-phone-call';
import GetLocation from 'react-native-get-location';
import axios from 'axios';


export default class ProfileDriverPage extends Component{

  constructor(props){
    super(props);  
    this.state = {
      selectTab: 'profile',
      popupVisible: false,
      isLoading : false,
      isCalcDuration : false,

    };  
   
  } 

  async componentDidMount(){
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      this.setState({currentLat : location.latitude});
      this.setState({currentLng : location.longitude});

      AsyncStorage.getItem('userInfo').then((userinfo)=>{
        this.setState({driverInfo : JSON.parse(userinfo).uid});
        this.setState({uid : JSON.parse(userinfo).uid});

        this.setState({driverId : JSON.parse(userinfo).driverId});
        this.checkPermission();
        this.messageListener();
      });
    })
    .catch(error => {
        const { code, message } = error;
        console.log('error');
        console.warn(code, message);
    })  
    

  }  
  UNSAFE_componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  getDriverProfile = async () =>{
    //puttinig device token to database
    await userService.updateDeviceDriverToken(this.state.driverId, this.state.deviceToken);

  }
  sendMessage() {
    SendSMS.send({
        //Message body
        body: 'Please insert message',
        //Recipients Number
        recipients: ['0123456789'],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
        if(completed){
          console.log('SMS Sent Completed');
        }else if(cancelled){
          console.log('SMS Sent Cancelled');
        }else if(error){
          console.log('Some error occured');
        }
    });
  }  
  call = () => {
    //handler to make a call
    const args = {
      number: this.state.phonenumber,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
        this.getFcmToken();
    } else {
        this.requestPermission();
    }
  }

  getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem ('fcmToken');
    if (!fcmToken) {
      try {
        fcmToken = await firebase.messaging().getToken();

      } catch (e) {
        console.log ('error ---->>', e);
      }
      if (fcmToken) {
        // user has a device token
        //await AsyncStorage.setItem ('fcmToken', fcmToken);
        this.setState({deviceToken : fcmToken});
        this.getDriverProfile();

      }
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      console.log("User has authorised");
      this.getFcmToken();
      // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.setState({cartLat :  notification._data.cartLat});
        this.setState({cartLng :  notification._data.cartLng});

        this.getDeliveryInfo(notification._data.cartId);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.setState({cartLat :  notificationOpen.notification._data.cartLat});
        this.setState({cartLng :  notificationOpen.notification._data.cartLng});

        this.getDeliveryInfo(notificationOpen.notification._data.cartId);
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();

    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert("title, body");
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  async getDeliveryInfo (cartId){
    this.setState({isCalcDuration : true});
    var first_name ;
    var last_name ;
    var address ;
    var phonenumber ;
    var photo_url ;
    var consumer_lat;
    var consumer_lng;

    cartService.getDeliveryInfo(cartId).then(result =>{
      result.forEach(function(consumerInfo){
        console.log('consumerInfo', consumerInfo);
         first_name = consumerInfo.val().first_name;
         last_name = consumerInfo.val().last_name;
         address = consumerInfo.val().address;
         phonenumber = consumerInfo.val().phonenumber;
         photo_url = consumerInfo.val().photo_url;
         consumer_lat = consumerInfo.val().currentLat;
         consumer_lng = consumerInfo.val().currentLng;
      });

      this.setState({first_name : first_name});
      this.setState({last_name : last_name});
      this.setState({address : address});
      this.setState({phonenumber : phonenumber});
      this.setState({photo_url : photo_url});
      this.setState({cartId : cartId});
      this.setState({ popupVisible: true });


    });  
console.log('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ this.state.cartLat + ',' + this.state.cartLng + '&destinations=' + this.state.currentLat + ',' + this.state.currentLng + '&mode=driving&key=AIzaSyDUNefWU4FzLHhoSaS7Wyb-VE2LvNDf3bs')
    axios({
      method : 'GET',
      url : 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ this.state.cartLat + ',' + this.state.cartLng + '&destinations=' + this.state.currentLat + ',' + this.state.currentLng + '&mode=driving&key=AIzaSyDUNefWU4FzLHhoSaS7Wyb-VE2LvNDf3bs'

    }).then(response =>{
      this.setState({isCalcDuration : false});

      if(response.data.rows[0].elements[0].status == 'ZERO_RESULTS')
        this.setState({duration : "immdediately"});
      else{
        var duration = response.data.rows[0].elements[0].duration;
        this.setState({duration : duration.text});
      }

    });    


  }
  acceptOrder(){
    //cartService.updateCartByDriver(this.state.cartId, this.state.driverInfo, this.state.duration).then(result=>{
    cartService.updateCartByDriver('-M6aEm6jQYFaIODrmrK0', this.state.driverInfo, '10min').then(result=>{
        //this.props.navigation.navigate('TrackingPage');
    });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  } 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={{fontSize : 24}}>Profile</Text>
          <ToggleSwitch
            isOn={true}
            onColor="#37d613"
            offColor="#b8b6b6"
            label="online"
            labelStyle={{ fontWeight: "200", fontSize : 14}}
            size="small"
            onToggle={isOn => console.log("changed to : ", isOn)}
          />          
        </View>
        <ScrollView>
        <View style={{alignItems : 'center', justifyContent : 'center', width : '100%'}}>
          <View style={styles.logopicWrap}>
            <Image style={styles.logopic} source={require('../../assets/imgs/photo.png')} ></Image>
            {/* <Image style={styles.camera} source={require('../assets/imgs/camera.png')} ></Image> */}
          </View>
          <Text style={{color: '#a2a6a2', marginTop : 10}}>Larry W, 33</Text>
          <Text style={{fontSize : 38, fontWeight : '600' , marginTop : 10}}>$1,325.70</Text>
          <Text style={{color: '#a2a6a2', fontSize : 18, marginTop : 10}}>Available Balance</Text>

        </View>
        <TouchableOpacity style={styles.textinputview} onPress={this.props.gotoProfileInfoPage}> 
          <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
          <Text style={{color : '#a2a6a2', fontSize : 18}}>Driver Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textinputview} > 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textinputview} onPress={this.props.gotoSigninPage}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Logout</Text>
        </TouchableOpacity>  

        </ScrollView>
        
        <Tabs 
          openPopup={() => {this.setState({ popupVisible: true });}}
          gotoDriverHistoryPage={() => this.props.navigation.navigate('DriverHistoryPage')}
          selectTab={this.state.selectTab}
          />
          <Dialog
              visible={this.state.popupVisible}
              dialogStyle={{borderTopLeftRadius : 30, borderTopRightRadius : 30}}
              containerStyle={{ justifyContent: 'flex-end'}}
              width={screenWidth}
              height={screenHeight * 1/4}
              dialogTitle={
                <View style={{width : screenWidth,  flexDirection : 'row', marginTop : 10}}>
 
                  <View style={{width : screenWidth * 2/12, alignItems:'center', justifyContent:'center'}}>
                  {this.state.photo_url == undefined ?
                    <Image style={{width : 50, height : 50}} source={require('../../assets/imgs/driver_avatar.png')} ></Image> :
                    <Image style={{width : 50, height : 50, borderRadius : 10}} source={{ uri: this.state.photo_url }} ></Image>
                  }  
                  </View>
                  <View style={{width : screenWidth * 6/12, alignItems:'center', justifyContent:'center',}}>
                    <Text style={{fontSize : 16}}>Deliver to {this.state.first_name}.</Text>
                  </View>
                  <TouchableOpacity onPress={this.sendMessage.bind(this)} style={{width : screenWidth * 2/12, alignItems:'center', justifyContent:'center',}}>
                    <Image style={{width : 40, height : 40}} source={require('../../assets/imgs/message.png')} ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.call} style={{width : screenWidth * 2/12, alignItems:'center', justifyContent:'center',}}>
                    <Image style={{width : 40, height : 40}} source={require('../../assets/imgs/phonecall.png')} ></Image>
                  </TouchableOpacity>
                </View>

              }
              onTouchOutside={() => {
              this.setState({ popupVisible: false });
              }}
              >
              <DialogContent>
{/*                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../assets/imgs/location.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>East Central Atlanta</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : '100%', marginLeft : 50 }} />
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../assets/imgs/pinpoints.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>Little Five Points</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : 1000}} />
            */}                
                <View style={{flexDirection:'row', width : '100%', margin : 20, justifyContent : 'flex-start'}}>
                  <Image source={require('../../assets/imgs/car.png')} ></Image>
                  <View>
                    <Text style={{fontSize : 16, color : '#a0a3a0', marginLeft : 20,  marginBottom : 5}}>Estimate complete in</Text>
                    {this.state.isCalcDuration ?
                        <ActivityIndicator size="large" color="#9E9E9E"/> :
                        <Text style={{fontSize : 16,marginLeft : 20,}}>{this.state.duration}</Text>
                    }
                    
                  </View>

                </View>
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => this.acceptOrder()}>
                      <Text style={{color : 'white'}}>Accept</Text>
                    </TouchableOpacity>                    
                </View>
                </DialogContent>
          </Dialog>   
      </SafeAreaView>

    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height) ;

const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
    alignItems : 'center'
   },
   titleView : {
     width : '100%',
     height : 80,
     flexDirection : 'row',
     alignItems : 'center',
     justifyContent : 'space-between',
     paddingLeft : 150,
     paddingRight : 30
   },
   dialogHeaderView : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    width : '100%',
    height : 80,
    backgroundColor : '#ededed'
  },
  declineBtn : {
    width : 150,
    height : 50,
    borderWidth : 1,
    borderColor : '#a0a3a0',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 20
  },
  acceptBtn : {
    width : 150,
    height : 50,
    borderColor : '#a0a3a0',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#23b825',
    borderRadius : 20
  },
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth - 60,
    height: 50,
    marginTop : 20,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 1
  },    
  icon : {
      marginLeft : 20,
      marginRight : 20
  },
  textinput : {
      width : screenWidth - 100,
      height: 60,
  },
  signinBtn: {
      marginTop : 20,
      backgroundColor:'#23b825',
      width : screenWidth - 60,
      height: 50,
      borderRadius:20,
      justifyContent : 'center',
      alignItems : 'center',
      shadowColor: '#919090',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.9,
      elevation: 10,  
  },
  signiText : {
      color : 'white',
      fontSize : 22,
      fontWeight : '400'
  },
  textareaContainer : {
      borderWidth : 1,
      borderColor : '#dee0de',
      height : 150,
      backgroundColor: '#ededed',
  },
  logopic: {
    width : 150,
    height : 150,
    borderRadius : 10
  },
  camera : {
    width : 50,
    height : 50,
    marginTop : -30
  },
  logopicWrap : {
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius: 10,
    width : 170,
    height : 170,
    borderWidth : 3,
    borderColor : '#2cc94e',
    borderRadius: 100,


  }
});

