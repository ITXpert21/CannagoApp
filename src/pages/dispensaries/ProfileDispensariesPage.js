
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  AsyncStorage,
  View
} from 'react-native';

import Header from '../../components/dispensaries/profile/Header';
import Content from '../../components/dispensaries/profile/Content';
import Tabs from '../../components/dispensaries/tab/Tabs';
import ToggleSwitch from 'toggle-switch-react-native'
export default class ProfileDispensariesPage extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      selectTab: 'profile'
    }; 
  } 
  async removeItemValue() {
   
    await AsyncStorage.removeItem('userInfo');
    this.props.navigation.navigate('SigninDispensariesPage');

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
            gotoProfileInfoPage={() => this.props.navigation.navigate('DispensariesInfoPage')}
            gotoSigninPage={() => this.removeItemValue()}
            />
        </ScrollView>
        
        <Tabs 
          gotoProductsPage={() => this.props.navigation.navigate('ProductsDispensariesPage')}
          gotoOrderHistoryPage={() => this.props.navigation.navigate('OrderHistoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfileDispensariesPage')}

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
   titleView : {
     width : '100%',
     height : 80,
     flexDirection : 'row',
     alignItems : 'center',
     justifyContent : 'space-between',
     paddingLeft : 150,
     paddingRight : 30
   }
});

