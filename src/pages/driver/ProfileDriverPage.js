
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
  View
} from 'react-native';

import Header from '../../components/driver/profile/Header';
import Content from '../../components/driver/profile/Content';
import Tabs from '../../components/driver/tab/Tabs';
import ToggleSwitch from 'toggle-switch-react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ProfileDriverPage extends Component{
  state = {
    selectTab: 'profile',
    popupVisible: false
  };
 
  constructor(props){
    super(props);
    
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
          <Header/>
          <Content 
            gotoProfileInfoPage={() => this.props.navigation.navigate('DriverInfoPage')}
            gotoSigninPage={() => this.props.navigation.navigate('SigninDriverPage')}
            />
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
              height={screenHeight * 2/5}
              dialogTitle={
                <View>
                  <View style={styles.dialogHeaderView}>
                    <Image style={{width : 50, height : 50}} source={require('../../assets/imgs/driver_avatar.png')} ></Image>
                    <Text style={{fontSize : 20, marginLeft : 20}}>Driver Name Bob D.</Text>
                    <Image style={{width : 40, height : 40 , marginLeft : 20}} source={require('../../assets/imgs/message.png')} ></Image>
                    <Image style={{width : 40, height : 40, marginLeft : 10}} source={require('../../assets/imgs/phonecall.png')} ></Image>

                  </View>

                </View>

              }
              onTouchOutside={() => {
              this.setState({ popupVisible: true });
              }}
              >
              <DialogContent>
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../assets/imgs/location.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>East Central Atlanta</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : '100%', marginLeft : 50 }} />
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../assets/imgs/pinpoints.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>Little Five Points</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : 1000}} />
                <View style={{flexDirection:'row', width : '100%', margin : 20, justifyContent : 'flex-start'}}>
                  <Image source={require('../../assets/imgs/car.png')} ></Image>
                  <View>
                    <Text style={{fontSize : 16, color : '#a0a3a0', marginLeft : 20,  marginBottom : 5}}>Estimate complete in</Text>
                    <Text style={{fontSize : 16,marginLeft : 20,}}>10 Mins</Text>
                  </View>

                </View>
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => {this.setState({ popupVisible: false }); this.props.navigation.navigate('TrackingDriverPage')}}>
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
  }

});

