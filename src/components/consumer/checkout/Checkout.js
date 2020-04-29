import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import Textarea from 'react-native-textarea';
import { Divider } from 'react-native-elements';
export default class Checkout extends Component{

 
    constructor(props){
        super(props)
        this.state={
            textValue: 'Want to drive with us?'
        }
    }
 

  render(){
    return (
        <View style={{width : '100%'}}>
            <View style={{ marginLeft : '10%', height : 50, justifyContent : 'flex-end'}}> 
                <Text style={{fontSize:20, fontWeight : '400'}}>Order Summary</Text>
            </View>
            <Divider style={{ marginTop: 10, backgroundColor: '#a0a3a0' }} />
            <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Just CBD Gummies x 2</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ 49.98</Text>
           </View>
           <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>CBD Wax 10 ML</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ 15.98</Text>
           </View>
           <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Service Fee</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ 5.00</Text>
           </View>
           <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>State tax</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ 5.00</Text>
           </View>
           <Divider style={{ margin: 20, backgroundColor: '#a0a3a0' }} />
           <View style={styles.totaltextview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Total Amount</Text>
                <Text style={{fontSize:16, fontWeight : '400', color : '#cf4a08'}}>$ 74.81</Text>
           </View>
           <View style={{marginLeft : '10%', marginBottom : 20, marginTop : 20}}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Promo Code</Text>
                <View style={styles.applyview}> 
                    <View style={{width : '60%', height : 50}}>
                        <TextInput style={styles.inputtext} placeholder="Type here"/>
                    </View>
                    <TouchableOpacity style={styles.buttonview}>
                        <Text style={{color : 'white', fontSize : 18, fontWeight : '500'}}>Apply</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView horizontal={true} height={120} width={screenWidth *9/10} style={{marginLeft : '10%'}}>
                <View style={{flexDirection : 'row', justifyContent : 'center'}}>
                    <View style={styles.paymentmethodview}>
                        <Image source={require('../assets/imgs/visa.png')} ></Image>
                    </View>
                    <View style={styles.paymentmethodview}>
                        <Image source={require('../assets/imgs/mastercard.png')} ></Image>
                    </View>
                    <View style={styles.paymentmethodview}>
                        <Image source={require('../assets/imgs/express.png')} ></Image>
                    </View>   
                    <View style={styles.paymentmethodview}>
                        <Image source={require('../assets/imgs/paypal.png')} ></Image>
                    </View>                                    
                </View>
            </ScrollView>
            <View style={{marginLeft : '10%'}}>
                <Text style={{fontSize:16, fontWeight : '400'}}>Card Number</Text>
                <TextInput style={styles.cardnumber} />
            </View>
            <View style={{marginLeft : '10%', marginTop : 20}}>
                <Text style={{fontSize:16, fontWeight : '400'}}>Special request</Text>
                <Textarea
                     containerStyle={styles.textareaContainer}
                    // style={styles.textarea}
                    // onChangeText={this.onChange}
                    // defaultValue={this.state.text}
                    maxLength={120}
                    placeholder={'The gate code is #12345...'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />  
          </View>   
          <TouchableOpacity onPress={this.props.gotoTrackingPage}>
            <View style={styles.addcart}>
                <Text style={styles.addcarttext}>Check Out</Text>
            </View>
            </TouchableOpacity>                   
        </View>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    textview : {
        marginLeft : '10%', 
        marginRight : '10%', 
        marginTop: 20, 
        flexDirection : 'row', 
        justifyContent : 'space-between'
    },
    applyview : {
        flexDirection: 'row',
        alignItems : 'center',
        width : '90%',
        height: 50,
        borderRadius : 15,
        borderColor : '#b3b0ad',
        borderWidth : 1 ,
        marginTop : 10,
        marginRight : '10%'   
    },
    buttonview : {
        backgroundColor : '#23b825',
        width : '40%',
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        borderBottomRightRadius : 15,
        borderTopRightRadius : 15
    },
    inputtext : {
        marginLeft : 10,
        width : '60%',
        height: 50,
    },

    totaltextview : {
        marginLeft : '10%', 
        marginRight : '10%', 
        flexDirection : 'row', 
        justifyContent : 'space-between'
    },
    paymentmethodview : {
        width : screenWidth/4,
        height : 100,
        borderWidth  : 1,
        borderColor : '#b3b3b3',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
        marginRight : 10
    },
    cardnumber : {
        borderWidth : 1,
        width : '90%',
        height : 50,
        borderRadius : 10,
        borderColor : '#b3b3b3',
        padding : 10,
        marginTop : 10
    },
    textareaContainer : {
        borderWidth : 1,
        borderColor : '#b3b3b3',
        width : '90%',
        height : 100,
        marginTop : 10
    },
    addcarttext : {
        color : 'white',
        fontSize : 22,
        fontWeight : '400'
    },
      addcart: {
          backgroundColor:'#23b825',
          width : '80%',
          height: 50,
          borderRadius:20,
          justifyContent : 'center',
          alignItems : 'center',
          shadowColor: '#919090',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.9,
          elevation: 10, 
          marginLeft : '10%',
          marginBottom : 20 ,
          marginTop : 20 
      }
});
