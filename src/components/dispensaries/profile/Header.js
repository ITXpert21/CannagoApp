import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';

export default class Header extends Component{
  render(){
    return (
          <View style={{alignItems : 'center', justifyContent : 'center', width : '100%'}}>
            <View style={styles.logopicWrap}>
              <Image style={styles.logopic} source={require('../../../assets/imgs/station1.png')} ></Image>
              <Image style={styles.camera} source={require('../../../assets/imgs/camera.png')} ></Image>
            </View>
            <Text style={{fontSize : 38, fontWeight : '600'}}>$1,325.70</Text>
            <Text style={{color: '#a2a6a2'}}>Available Balance</Text>

          </View>
    
    );
  }
}

const styles = StyleSheet.create({

  logopic: {
    width : '100%',
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
    width : '100%',
    height : 170,
  }

});
