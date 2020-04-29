
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DriverHistory from '../../components/driver/driverhistory/DriverHistory';
import Tabs from '../../components/driver/tab/Tabs';

export default class DriverHistoryPage extends Component{

  state = {
    selectTab: 'cart'
  };
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={{flex : 1, justifyContent : 'flex-end', backgroundColor : '#61D273'}}>
        <View style={{alignItems : 'center', justifyContent : 'center', marginTop:20}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('TrackingPage')}>
            <Text style={{color : 'white', fontSize : 18}}>Order History</Text>
          </TouchableOpacity>  
        </View>
       <ScrollView height={300}>
          <DriverHistory/>
       </ScrollView> 

        <Tabs 
          gotoProfilePage={() => {this.props.navigation.navigate('ProfileDriverPage')}}
          selectTab={this.state.selectTab}
          />  
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  addcarttext : {
    color : 'white',
    fontSize : 22,
    fontWeight : '400'
},
  addcart: {
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
      margin : 30 
  }
});

