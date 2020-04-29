
import React, {Component, PureComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,  View, TextInput, TouchableOpacity, Text, Image, 
  Dimensions, FlatList, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import Tabs from '../../components/consumer/tab/Tabs';
import { Divider } from 'react-native-elements';
import Textarea from 'react-native-textarea';
import  stripe, { PaymentCardTextField } from 'tipsi-stripe';
import cartService from '../../services/cartService';

import axios from 'axios';
stripe.setOptions({
  publishableKey: 'pk_test_RYCfmu3MGlNGid0AapN00V13005KibQNib'
  })

export default class CheckoutPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectTab: 'none',
      valid: false,
      token : '',
      loading : false,
      params: {
        number: '',
        expMonth: 0,
        expYear: 0,
        cvc: '',
      },
    }
  } 
  UNSAFE_componentWillMount(){
    var productlist = this.props.navigation.state.params.navParam.productlist;
    var cartId = this.props.navigation.state.params.navParam.cartId;
    var cartlist = this.props.navigation.state.params.navParam.cartlist;

    var product_fee = 0;
    var grossprice = 0;
    var totalGrossPrice = 0;
    for( var i=0; i<productlist.length; i++){
      product_fee = product_fee + productlist[i].ourfee * productlist[i].buyQuantity;
      grossprice = grossprice + productlist[i].grossprice * productlist[i].buyQuantity;
      totalGrossPrice = totalGrossPrice + productlist[i].grossprice * productlist[i].buyQuantity;
    }
    this.setState({product_fee : Math.round(product_fee)});
    this.setState({grossprice : Math.round(grossprice)});
    this.setState({totalGrossPrice : Math.round(totalGrossPrice)});
    this.setState({productlist : productlist});
    this.setState({cartId : cartId});
    this.setState({cartlist : cartlist});


  }

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid,
      params,
    });
  }

  checkOut = async () => {


    this.setState({ loading: true, token: null });
    var number = this.state.params.number;
    var expMonth = this.state.params.expMonth;
    var expYear = this.state.params.expYear;
    var cvc = this.state.params.cvc;

    const tokenObject = await stripe.createTokenWithCard({
      number, expMonth, expYear, cvc
    });
    this.setState({ token: tokenObject.tokenId });

    var totalPrice = this.state.totalGrossPrice + this.state.product_fee + this.state.grossprice * 0.05;
    axios({
      method : 'POST',
      url : 'https://us-central1-cannago-ba078.cloudfunctions.net/payWithStripe',
      data : {
        amount: Math.round(totalPrice),
        currency : 'usd',
        token : this.state.token
      },
    }).then(response =>{
      this.state.cartlist[0].amount = Math.round(totalPrice);
      this.state.cartlist[0].currency = 'usd';
      this.state.cartlist[0].status = "paid";
      this.setState({loading: false});
      cartService.updateCheckOutStatus(this.state.cartlist[0]).then(result=>{
        
        this.props.navigation.navigate('TrackingPage');
      });
    });

  };


  render(){
    const { valid, params } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{ marginLeft : '10%', height : 50, justifyContent : 'flex-end'}}> 
          <Text style={{fontSize:20, fontWeight : '400'}}>Order Summary</Text>
        </View>
        <Divider style={{ marginTop: 10, backgroundColor: '#a0a3a0' }} />

        <FlatList
            data={this.state.productlist}
            renderItem={({ item }) => (
            <View style={{width : '100%'}}>
              <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>{item.product_name} x {item.buyQuantity}</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ {item.grossprice * item.buyQuantity}</Text>
              </View>   
              <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Service Fee</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ {this.state.product_fee}</Text>
              </View>    
              <View style={styles.textview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>State tax</Text>
                <Text style={{fontSize:16, fontWeight : '400'}}>$ {Math.round(this.state.grossprice * 0.05)}</Text>
              </View> 
              <Divider style={{ margin: 20, backgroundColor: '#a0a3a0' }} />
              <View style={styles.totaltextview}> 
                <Text style={{fontSize:16, fontWeight : '400'}}>Total Amount</Text>
                <Text style={{fontSize:16, fontWeight : '400', color : '#cf4a08'}}>$ {this.state.totalGrossPrice + this.state.product_fee + Math.round(this.state.grossprice * 0.05)}</Text>
              </View>              
            </View>            
            )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          />
          <View style={{flexDirection : 'row', justifyContent : 'center', marginTop : 20}}>
            <View style={styles.paymentmethodview}>
                <Image source={require('../../assets/imgs/visa.png')} ></Image>
            </View>
            <View style={styles.paymentmethodview}>
                <Image source={require('../../assets/imgs/mastercard.png')} ></Image>
            </View>
            <View style={styles.paymentmethodview}>
                <Image source={require('../../assets/imgs/express.png')} ></Image>
            </View>   
            {/* <View style={styles.paymentmethodview}>
                <Image source={require('../../assets/imgs/paypal.png')} ></Image>
            </View>                                     */}
          </View>
          <View style={{marginLeft : '10%', marginTop : '10%'}}>
            <Text style={{fontSize:16, fontWeight : '400'}}>Card Number</Text>
            <PaymentCardTextField
              accessible={false}
              style={styles.field}
              onParamsChange={this.handleFieldParamsChange}
              numberPlaceholder="XXXX XXXX XXXX XXXX"
              expirationPlaceholder="MM/YY"
              cvcPlaceholder="CVC"
          />   
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
          {this.state.loading &&
          <ActivityIndicator size="large" color="#9E9E9E"/>
          }
          <TouchableOpacity onPress={() => this.checkOut()}>
            <View style={styles.addcart}>
              <Text style={styles.addcarttext}>Check Out</Text>
            </View>
          </TouchableOpacity>  
        
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
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
  },
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
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  spoiler: {
    width: 300,
  },
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  field: {
    width: '90%',
    color: '#449aeb',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },  
});

