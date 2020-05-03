
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Textarea from 'react-native-textarea';
import Tabs from '../../components/consumer/tab/Tabs';
import userService from '../../services/userService';
import axios from 'axios';
import email from 'react-native-email'
const screenWidth = Math.round(Dimensions.get('window').width);

export default class ProfilePage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      selectTab: 'profile',
      isLoading : false,
    }; 
  }
  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      let uid = JSON.parse(userinfo).uid;
      this.setState({uid : uid});
      this.getConsumerProfileInfo(uid);
    });
  } 

  getConsumerProfileInfo = (uid) =>{
    this.setState({isLoading : true});
    this.setState({isLoading : true});
    userService.getConsumerProfileInfo(uid).then(result =>{
      var consumerInfo;
      result.forEach(function(profileInfo){
        consumerInfo = profileInfo.val();
      });
      this.setState(consumerInfo);
      this.setState({isLoading : false});
    });  
  }  
  sendMessage = () =>{
    const to = ['contactcannago@gmail.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: 'Subject',
        body: 'Some body right here'
    }).catch(console.error)
  }
  async signOut() {
    await AsyncStorage.removeItem('userInfo');
    this.props.navigation.navigate('SigninPage');
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{alignItems : 'center', justifyContent : 'center'}}>
        {this.state.isLoading &&
          <View style={styles.logopicWrap}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        }
        {!this.state.isLoading &&
          <View style={styles.logopicWrap}>
          {this.state.photo_url == undefined ?
            <Image style={styles.camera} source={require('../../assets/imgs/camera.png')} ></Image> :
            <Image style={styles.logopic} source={{ uri: this.state.photo_url }} ></Image>
          }          
          </View>
          }
          {this.state.first_name != '' ?
            <Text style={{color: '#a2a6a2', fontSize : 22}}>{this.state.first_name} </Text> : null
          }
        </View>
        <View style={{alignItems : 'center'}}>
          <TouchableOpacity style={styles.textinputview} onPress={() => this.props.navigation.navigate('ProfileInfoPage')}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Profile Information</Text>
          </TouchableOpacity>

          {/*<TouchableOpacity style={styles.textinputview} onPress={this.props.gotoPaymentPage}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Payment</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity style={styles.textinputview} onPress={() => this.sendMessage()}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.signOut()}  style={styles.textinputview}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <Text style={{color : '#a2a6a2', fontSize : 18}}>Logout</Text>
          </TouchableOpacity>  
            <Dialog
              visible={this.state.popupVisible}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="Back"
                    onPress={() => {this.setState({ popupVisible: false });}}
                  />
                  <DialogButton
                    text="Send"
                    containerStyle={{backgroundColor : '#23b825'}}
                    onPress={()=> this.sendMessage()}
                  />
                </DialogFooter>
                }                        
                dialogStyle={{borderTopLeftRadius : 30, borderTopRightRadius : 30}}
                width={screenWidth}
                containerStyle={{ justifyContent: 'flex-end', borderRadius : 40}}

              height={300}
              dialogTitle={<Text style={{fontSize : 18, margin : 20}}>Message: </Text>}
              onTouchOutside={() => {
              this.setState({ popupVisible: false });
              }}
              >
              <DialogContent>
                  <Textarea
                      containerStyle={styles.textareaContainer}
                      // style={styles.textarea}
                      // onChangeText={this.onChange}
                      // defaultValue={this.state.text}
                      maxLength={200}
                      placeholder={' Type here...'}
                      placeholderTextColor={'#c7c7c7'}
                      underlineColorAndroid={'transparent'}
                      />  
              </DialogContent>
          </Dialog>                       
        </View>        
      {/*<Content 
            gotoProfileInfoPage={() => this.props.navigation.navigate('ProfileInfoPage')}
            gotoSigninPage={() => this.props.navigation.navigate('SigninPage')}            
            gotoPaymentPage={() => this.props.navigation.navigate('PaymentPage')}
      />*/}
        </ScrollView>
        
        <Tabs 
          gotoAddNewCartPage={() => this.props.navigation.navigate('AddNewCartPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchStorePage={() => this.props.navigation.navigate('SearchStorePage')}

          selectTab={this.state.selectTab}
          />

      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
    alignItems : 'center'
   },
   logopic: {
    width : 150,
    height : 150,
    borderRadius: 100,

  },
  logopicWrap : {
      alignItems : 'center',
      justifyContent : 'center',
      borderWidth : 3,
      borderColor : '#2cc94e',
      borderRadius: 100,
      width : 170,
      height : 170,
      marginTop : 20,
      marginBottom : 10
  },
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
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
      width : 250,
      height: 60,
  },
  signinBtn: {
      marginTop : 20,
      backgroundColor:'#23b825',
      width : 320,
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
  camera : {
    width : 60,
    height : 60,
  }, 
});

