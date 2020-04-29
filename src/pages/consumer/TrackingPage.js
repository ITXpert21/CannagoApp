
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

import Tabs from '../../components/consumer/tab/Tabs';
import MapView, { Marker,  PROVIDER_GOOGLE } from 'react-native-maps';
const { width, height } = Dimensions.get('window');


export default class TrackingPage extends Component{

  state = {
    selectTab: 'tracking'
  };
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={{flex : 1, justifyContent : 'flex-end'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RatePage')}>
          <View style={styles.trackingview}>
            <Image source={require('../../components/consumer/assets/imgs/pinmap.png')} ></Image> 
            <Image source={require('../../components/consumer/assets/imgs/road.png')} ></Image> 
            <Text style={{fontSize : 22, fontWeight : '400', marginTop : 5}}>Distance</Text>
            <Text style={{fontSize : 16, fontWeight : '300', marginTop : 5}}>Estimated Time of Arrival 5:23 pm</Text>
            <Text style={{fontSize : 16, fontWeight : '300', marginTop : 5}}>Honda Civic | Black | Plate GFQ1FT</Text>
          </View>
        </TouchableOpacity>

{/* 
        <Tabs 
          gotoReportPage={() => this.props.navigation.navigate('ReportPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchStorePage={() => this.props.navigation.navigate('SearchStorePage')}
          selectTab={this.state.selectTab}
          />   */}
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
  },
  map: {
    marginTop : 10,
    width : width,
    height : screenHeight * 5/6
  },
});

