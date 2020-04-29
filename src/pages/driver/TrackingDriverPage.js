
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  View
} from 'react-native';

import Tabs from '../../components/driver/tab/Tabs';

export default class TrackingDriverPage extends Component{

  state = {
    selectTab: 'none'
  };
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={{flex : 1, justifyContent : 'flex-end'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileDriverPage')}>
          <View style={styles.trackingview}>
            <Image source={require('../../components/consumer/assets/imgs/pinmap.png')} ></Image> 
            <Image source={require('../../components/consumer/assets/imgs/road.png')} ></Image> 
            <Text style={{fontSize : 22, fontWeight : '400', marginTop : 5}}>Distance</Text>
            <Text style={{fontSize : 16, fontWeight : '300', marginTop : 5}}>Estimated Time of Arrival 5:23 pm</Text>
            <Text style={{fontSize : 16, fontWeight : '300', marginTop : 5}}>Honda Civic | Black | Plate GFQ1FT</Text>

          </View>
        </TouchableOpacity>

        <Tabs 
          gotoProfilePage={() => this.props.navigation.navigate('ProfileDriverPage')}
          gotoDriverHistoryPage={() => this.props.navigation.navigate('DriverHistoryPage')}

          selectTab={this.state.selectTab}
          />  
      </SafeAreaView>

    );
  }
}
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  trackingview : {
    width : '100%',
    height : screenHeight/6,
    borderWidth : 1,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    borderColor : '#a3a0a0',
    borderBottomWidth : 0,
    alignItems : 'center',
    justifyContent : 'center'
  },
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

