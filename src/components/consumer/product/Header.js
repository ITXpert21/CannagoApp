import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';

export default class Header extends Component{
  render(){
    return (
            <View style={styles.logopicWrap}>
                <Image style={styles.logopic} source={require('../assets/imgs/photo.png')} ></Image>
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
        marginBottom : 20
    }

});
