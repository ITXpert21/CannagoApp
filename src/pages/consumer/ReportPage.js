
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

import Report from '../../components/consumer/report/Report';
import Tabs from '../../components/consumer/tab/Tabs';

export default class ReportPage extends Component{

  state = {
    selectTab: 'cart'
  };
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={{flex : 1, justifyContent : 'flex-end', backgroundColor : '#61D273'}}>
        <View style={{alignItems : 'center', justifyContent : 'flex-end', flexDirection : 'row', height : screenHeight/12, marginRight : '10%'}} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('TrackingPage')}>
            <Text style={{color : 'white', fontSize : 18}}>Check Order Status</Text>
          </TouchableOpacity>  
        </View>
       <ScrollView height={screenHeight * 11 /12} style={{marginLeft : '5%', marginRight : '5%'}}>
          <Report/>
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
const screenHeight = Math.round(Dimensions.get('window').height);

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

