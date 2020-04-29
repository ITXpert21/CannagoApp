
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { ListItem} from 'react-native-elements';
import cartService from '../../services/cartService';

export default class ProductDetailPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectTab: 'none',
      isAdding : false,
    };
  } 

  UNSAFE_componentWillMount(){
    let productInfo = this.props.navigation.state.params.navParam.product;
    let dispensaryId = this.props.navigation.state.params.navParam.dispensaryId;
    let dispensaryToken = this.props.navigation.state.params.navParam.dispensaryToken;

    productInfo.buyQuantity = 1;
    this.setState(productInfo);
    this.setState({productInfo : productInfo});
    this.setState({dispensaryId : dispensaryId});
    this.setState({dispensaryToken : dispensaryToken});

    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState({uid : JSON.parse(userinfo).uid})
    }); 
  }
  async addToCart() {

    this.setState({isAdding : true});
    cartService.getProductsInCart(this.state.uid).then(carts =>{
      var productlist = [];
      var cartId = '';
      console.log(carts);
      if(carts != null){
        carts.forEach(function(cart){
          if(cart.val().status == "progressing"){
            productlist = cart.val().products;
            cartId = cart.val().cartId;
          }
        });
      }
      productlist.push(this.state.productInfo);
      let addParam = {
        products : productlist,
        cart_uid : this.state.uid,
        paidDate : '',
        cartId : cartId,
        dispensaryId : this.state.dispensaryId,
        status : 'progressing',
        dispensaryToken : this.state.dispensaryToken
      };
      cartService.registerCart(addParam).then(addedInfo =>{
        this.setState({isAdding : false});
        this.props.navigation.navigate('ProductsPage');
      });  
      // this.setState({productlist : productlist});
      // this.setState({isEmptyData : false});
    });  


    // var productlist = [];
    // productlist.push(this.state.productInfo);

  }

  render(){
    let rating = 3;
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let path = require('../../assets/imgs/star1.png');
        if (i > rating) {
          path = require('../../assets/imgs/star2.png');
        }
        stars.push(<Image key={i} style={styles.ratingImage} source={path} />);
      }    
    return (
      <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductsPage')}>
        <View style={styles.backBtnView}>
          <Icon name="arrow-left"  size={30} color="white"/>
        </View>        
        </TouchableOpacity>           
        <ScrollView>

        <View style={{alignItems : 'center', marginTop : 20}}> 
          <Image style={styles.productimage} source={{ uri: this.state.photo_url }} ></Image>     
        </View>
        <View style={{alignItems : 'flex-start', justifyContent : 'center', paddingLeft : '10%', paddingRight : '10%'}}>
          <Text style={styles.producttext}>Name: {this.state.product_name}</Text>
          <Text style={styles.producttext}>Price: $ {this.state.productPrice.toString()}</Text>
          <View style={styles.ratingview}>
              <Text style={styles.producttext}>Rating: </Text> 
              <View style={{flexDirection: 'row', marginTop:20}}>
                  {stars}
              </View>
          </View>
          <Text style={styles.producttext}>Description:</Text>
          <Text style={{fontSize : 12, color: '#9fa19f'}}>
            {this.state.product_description}
          :</Text>
        </View>
        {this.state.isAdding &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            } 
        <View style={{alignItems : 'center', justifyContent : 'center'}}>
          <TouchableOpacity onPress={() => this.addToCart()}>
            <View style={styles.addcart}>
              <Text style={styles.addcarttext}>Add to Cart</Text>
            </View>
          </TouchableOpacity>           
        </View>
        <Text style={{fontSize : 20, marginLeft : '10%'}}>Reviews:</Text>

        <ListItem
          title='Naomi N.'
          subtitle={
              <View style={styles.subtitleView}>
                  {stars}
                  <Text style={styles.ratingText}>5 months ago</Text>
              </View>
          }
          containerStyle={styles.listitem}
          // leftAvatar={{ source: require('../assets/imgs/avatar1.png') }}
          />
        <Text style={{fontSize : 14, marginLeft : 50}}>This is my third time try this oil. I loved it.</Text>
        <ListItem
          title='Mason G.'
          subtitle={
              <View style={styles.subtitleView}>
                  {stars}
                  <Text style={styles.ratingText}>5 months ago</Text>
              </View>
          }
          containerStyle={styles.listitem}
          // leftAvatar={{ source: require('../assets/imgs/avatar2.png') }}
          />
          <Text style={{fontSize : 14, marginLeft : 50, marginRight : 20}}>New to the CBD scene. This was great oil to help relieve my pain.</Text>        
        </ScrollView>
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
  backBtnView : {
    width : '20%',
    height : 40,
    backgroundColor : '#23b825',
    marginTop : 20,
    alignItems : 'center',
    justifyContent : 'center'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 5
  },
  ratingImage: {
    height: 20,
    width: 20
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
    textAlign: 'right'
  },
  productimage : {
      height : 200,
      width : 200,
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10
  },    
  producttext : {
      fontSize : 20,
      marginTop : 20
  },

  ratingview : {
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : 'center',
      marginTop : 5,
  },
  addcarttext : {
      color : 'white',
      fontSize : 22,
      fontWeight : '400'
  },
  addcart: {
      backgroundColor:'#23b825',
      width : screenWidth - 60,
      height: 50,
      borderRadius:20,
      justifyContent : 'center',
      alignItems : 'center',
      shadowColor: '#919090',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.9,
      elevation: 10, 
      marginTop : 30,
      marginBottom : 30
  },
  listitem : {
      marginLeft : '10%',
      backgroundColor : 'transparent'
  }  
});


