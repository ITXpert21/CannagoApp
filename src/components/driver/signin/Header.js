import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';

export default class Header extends Component{
  render(){
    return (
        <View style={styles.header}>
            <View style={styles.logopicWrap}>
                <Image style={styles.logopic} source={require('../assets/imgs/driverlogo.png')} ></Image>
                <Text style={styles.logoname}>Cannago</Text>
                <Text style={styles.logouser}>for Drivers</Text>
            </View>

        </View>       
    );
  }
}

const styles = StyleSheet.create({
    header : {
      
        // ...Platform.select({
        //     ios: {
        //       backgroundColor: 'red',
        //     },
        //     android: {
        //       backgroundColor: 'blue',
        //     },
        // }),
        alignItems : 'center',

    },
    logopic: {
        width : 160,
        height : 170,

    },

    logopicWrap : {
        alignItems : 'center',

    },
    logoname : {
        fontSize : 43,
        fontWeight : 'bold' 
    },
    logouser : {
        fontSize : 18,
        color : '#61605f'
    },

});
