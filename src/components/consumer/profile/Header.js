import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';

export default class Header extends Component{
  render(){
    return (
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            <View style={styles.logopicWrap}>
                <Image style={styles.logopic} source={require('../../../assets/imgs/photo.png')} ></Image>
            </View>
            <Text style={{color: '#a2a6a2'}}>John H, 25</Text>

          </View>
    
    );
  }
}

const styles = StyleSheet.create({

    logopic: {
        width : 150,
        height : 150,
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
    }

});
