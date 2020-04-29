import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import Textarea from 'react-native-textarea';
import { Divider } from 'react-native-elements';

export default class Rate extends Component{
    constructor(props){
        super(props)
        this.state={
            textValue: 'Want to drive with us?'
        }
    }

  render(){
    let rating = 3;
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let path = require('../../../assets/imgs/star1.png');
        if (i > rating) {
          path = require('../../../assets/imgs/star2.png');
        }
        stars.push(<Image key={i} style={styles.ratingImage} source={path} />);
      }      
    return (
        <View>
            <View style={{marginTop : 30, alignItems : 'center', justifyContent : 'center'}}> 
                <Text style={{fontSize:20, fontWeight : '400'}}>Rate Experience</Text>
            </View>
            <View style={{margin : 20, alignItems : 'center', justifyContent : 'center'}}> 
                <Text style={{fontSize:20, fontWeight : '300'}}>Great</Text>
            </View>            
            <View style={{flexDirection : 'row', justifyContent : 'center'}}>
                {stars}
            </View>            
            <Divider style={{ margin: 20, backgroundColor: '#a0a3a0'}} />
            <View style={{alignItems : 'center', justifyContent : 'center'}}> 
                <Text style={{fontSize:20, fontWeight : '300'}}>What could be better?</Text>
            </View>            
            <View style={{alignItems : 'center', justifyContent : 'center'}}> 
                <View style={styles.betterview}>
                    <TouchableOpacity style={styles.betteritem}>
                        <Text style={styles.betteritemText}>Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.betteritem}>
                        <Text style={styles.betteritemText}>Driving Route</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.betterview}>
                    <TouchableOpacity style={styles.betteritem}>
                        <Text style={styles.betteritemText}>User Experience</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.betteritem}>
                        <Text style={styles.betteritemText}>Packagin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.betteritem}>
                        <Text style={styles.betteritemText}>Driver</Text>
                    </TouchableOpacity>                    
                </View>
            </View>            
            <Divider style={{ margin: 20, backgroundColor: '#a0a3a0'}} />
            <View style={{alignItems : 'center', justifyContent : 'center'}}> 
                <Text style={{fontSize:20, fontWeight : '300'}}>Leave a Tip?</Text>
            </View>            
            <View style={{alignItems : 'center', justifyContent : 'center'}}> 
                <View style={styles.betterview}>
                    <TouchableOpacity style={styles.tipitem}>
                        <Text style={styles.betteritemText}>10%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tipitem}>
                        <Text style={styles.betteritemText}>15%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tipitem}>
                        <Text style={styles.betteritemText}>20%</Text>
                    </TouchableOpacity>          
                    <TouchableOpacity style={styles.tipitem}>
                        <Text style={styles.betteritemText}>custom</Text>
                    </TouchableOpacity>                               
                </View>
            </View>
            <View style={styles.skipview}>
                <TouchableOpacity onPress={this.props.gotoProductCategoryPage}>
                    <Text style={{ fontSize: 18 }}>Skip</Text>
                </TouchableOpacity>
            </View>    
            <View style={{alignItems : 'center', justifyContent : 'center'}}> 
                <Text style={{fontSize:20, fontWeight : '300'}}>Leave comment</Text>
                <Textarea
                    containerStyle={styles.textareaContainer}
                    // style={styles.textarea}
                    // onChangeText={this.onChange}
                    // defaultValue={this.state.text}
                    maxLength={200}
                    placeholder={' Type here...'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                    />                 
            </View>

            <TouchableOpacity onPress={this.props.gotoProductCategoryPage} style={{alignItems : 'center', justifyContent : 'center'}}>
                <View style={styles.addcart}>
                    <Text style={styles.addcarttext}>Submit</Text>
                </View>
            </TouchableOpacity>    
        </View>
    );
  }
}

const styles = StyleSheet.create({
    betterview : {
        flexDirection : 'row', 
        justifyContent : 'center'
    },
    betteritem : {
        width : 100,
        height : 30,
        backgroundColor : '#c0c2c0',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginLeft : 10,
        marginTop : 20,
        marginRight : 10

    },
    betteritemText : {
        fontSize : 12,
    },    
    tipitem : {
        width : 70,
        height : 30,
        backgroundColor : '#c0c2c0',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginLeft : 10,
        marginTop : 20,
        marginRight : 10

    },   
    skipview : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        margin : 20
    },
    textareaContainer : {
        
        borderWidth : 1,
        borderColor : '#b3b3b3',
        width : '90%',
        height : 130,
        marginTop : 10
    },
    addcarttext : {
        color : 'white',
        fontSize : 22,
        fontWeight : '400'
    },
    addcart: {
        backgroundColor:'#23b825',
        width : '90%',
        height: 50,
        borderRadius:20,
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: '#919090',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10, 
        margin : 20 
    },
    ratingImage: {
        height: 30,
        width: 30,
        margin : 5
    },
});
