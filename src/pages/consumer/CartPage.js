
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Image,
  ActivityIndicator,
  View
} from 'react-native';

import Tabs from '../../components/consumer/tab/Tabs';
import Icon from 'react-native-vector-icons/Feather';
import cartService from '../../services/cartService';
import { ListItem} from 'react-native-elements';
import InputSpinner from 'react-native-input-spinner';

var buyProductList = [];
export default class CartPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectTab: 'cart',
      isEmptyData : false,
      isUpdateingCart : false,
      isShowAddPage : false
      
    };
  } 
  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState({uid : JSON.parse(userinfo).uid});
      this.getProductsInCart();
    });  
    
  }
  getProductsInCart = () =>{
    this.setState({isEmptyData : true});
    cartService.getProductsInCart(this.state.uid).then(carts =>{
      var productlist = [];
      var cartlist = [];
      var cartId = '';
      if(carts != null){
        carts.forEach(function(cart){
          if(cart.val().status == "progressing"){
            productlist = cart.val().products;
            cartId = cart.val().cartId;
            cartlist.push(cart.val());
          }
        });
        if(cartId != ''){
          this.setState({productlist : productlist});
          this.setState({cartlist : cartlist});

          this.setState({cartId : cartId});
          this.setState({isEmptyData : false});
          this.setState({isShowAddPage : false});
        }else{
          this.setState({isEmptyData : false});
          this.setState({isShowAddPage : true});
        }
      }

    });  
  } 
  onChangeBuyQuantity(index, quantity){
    this.state.productlist[index].buyQuantity = quantity;
  } 

  makeCart() {
    if(this.state.cartId == undefined){
      this.props.navigation.navigate('ProductCategoryPage');
      return;
    }

    this.setState({isUpdateingCart : true});


    cartService.updateCart(this.state.productlist, this.state.cartId).then(result=>{
      this.setState({isUpdateingCart : false});
      let navParam = {
        productlist : result,
        cartId : this.state.cartId,
        cartlist : this.state.cartlist
      };
      this.props.navigation.navigate('CheckoutPage', { navParam });
    });
  }
  render(){
    return (
      <SafeAreaView style={{flex : 1, justifyContent : 'flex-end'}}>
        <View style={{flexDirection : 'row', width : '100%', height : screenHeight * 1 / 12}}>
          <TouchableOpacity style={styles.backBtnView} onPress={() => this.props.navigation.navigate('CheckoutPage')}>
            <Icon name="arrow-left"  size={30} color="white"/>
          </TouchableOpacity>        
          <View style={styles.pageTitle}>
            <Text style={{fontSize : 22}}>Cart</Text>
          </View>        
        </View>
        {this.state.isEmptyData &&
          <ActivityIndicator size="large" color="#9E9E9E"/>
        }
        {this.state.isShowAddPage && 
        <View style={styles.addcartbuttonview}> 
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ProductCategoryPage')}>
            <Image source={require('../../assets/imgs/cartadd.png')} style={{height:120}}></Image>
          </TouchableOpacity>
          <Text style={{fontSize : 20, marginTop : 20}}>Shopping Cart Empty</Text>
        </View>
        } 
       <ScrollView height={screenHeight * 7 / 12} >

        {!this.state.isEmptyData &&
          <FlatList
            data={this.state.productlist}
            renderItem={({ item, index }) => (
            <ListItem
              title={item.product_name}
              subtitle={
              <View>
                <Text style={{color : '#23b825', fontSize : 14, margin : 5}}>$ {item.productPrice.toString()}</Text>
                <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    value={1}
                    height={30}
                    width={100}
                    style={{margin : 5}}
                    onChange={(num)=>{
                      this.onChangeBuyQuantity(index, num);
                      
                    }} />
              </View>
              }
              containerStyle={styles.listitem}
               leftAvatar={
                <View style={styles.productimageview}>
                <Image style={styles.productimage} source = {{ uri: item.photo_url }} ></Image>
                </View>
               }
            />              
            )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          />}   
         

        </ScrollView> 
        {/* <View style={{height : screenHeight * 1 / 24}}>
            <Text style={{fontSize : 20, marginLeft : '10%'}}>Recommended Items</Text>
        </View>
        <ScrollView horizontal={true} height={screenHeight * 3 / 12} style={{marginLeft : '5%'}}>
          <RecommendProduct />
        </ScrollView> */}
        {this.state.isUpdateingCart &&
          <ActivityIndicator size="large" color="#9E9E9E"/>
        }
        <TouchableOpacity onPress={() => this.makeCart()}>
          <View style={styles.addcart}>
              <Text style={styles.addcarttext}>Next</Text>
          </View>
        </TouchableOpacity>
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
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  addcarttext : {
    color : 'white',
    fontSize : 22,
    fontWeight : '400'
},
  addcart: {
      backgroundColor:'#23b825',
      width : '80%',
      height: screenHeight * 1 / 24 + 10,
      borderRadius:20,
      justifyContent : 'center',
      alignItems : 'center',
      shadowColor: '#919090',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.9,
      elevation: 10, 
      marginLeft : '10%' ,
      marginBottom : 20
    },
    backBtnView : {
      width : '20%',
      height : screenHeight * 1 / 24,
      backgroundColor : '#23b825',
      marginTop : 20,
      alignItems : 'center',
      justifyContent : 'center',
      flexDirection : 'row'
    },
    pageTitle : {
      width : '60%',
      height : screenHeight * 1 / 24,
      alignItems : 'center',
      justifyContent : 'center',
      marginTop : 20,

    },
    productimageview : {
      width : 100,
      height : 100,
      borderWidth : 1,
      borderRadius : 10,
      borderColor : '#23b825',
      alignItems : 'center',
      justifyContent : 'center'
    },
    productimage : {
        height : 90,
        width : 90

    }, 
    listitem : {
        backgroundColor : 'transparent',
        marginLeft : '10%'
    },
    addcartbuttonview : {
      width : '100%',
      height : screenHeight*4/7,
      alignItems : 'center',
      justifyContent : 'center',
    }
});

