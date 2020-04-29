
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
  Text,
  TextInput
} from 'react-native';
import { SearchBar} from 'react-native-elements';
import Tabs from '../../components/consumer/tab/Tabs';
import productService from '../../services/productService';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ProductsPage extends Component{

  constructor(props){
    super(props);
    this.  state = {
      selectTab: 'none',
      isEmptyData : false,
      dispensary_uid : '',
      dispensaryId : ''
  
    };
  }  
  UNSAFE_componentWillMount(){
    let dispensary_uid = this.props.navigation.state.params.navParam.dispensary.uid;
    let dispensaryId = this.props.navigation.state.params.navParam.dispensary.dispensaryId;
    let dispensaryToken = this.props.navigation.state.params.navParam.dispensary.token;
    this.setState({dispensaryId : dispensaryId});
    this.setState({dispensaryToken : dispensaryToken});
    this.getProducts(dispensary_uid);
  }

  updateSearch = search => {
    this.setState({ search });
  };

  getProducts = (dispensary_uid) =>{
    this.setState({isEmptyData : true});
    productService.getProductsByDispensary(dispensary_uid).then(productsInfo =>{
      var productlist = [];
      productsInfo.forEach(function(product){
        productlist.push(product.val());
      });
      this.setState({productlist : productlist});
      this.setState({isEmptyData : false});
    });  
  }  
  detailProduct = (product) => {
    let navParam = {
      product : product,
      dispensaryId : this.state.dispensaryId,
      dispensaryToken : this.state.dispensaryToken
    };
    this.props.navigation.navigate('ProductDetailPage', { navParam });
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
          <SearchBar
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={styles.searchcontainer}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
        <ScrollView>
        {/* {this.state.isEmptyData &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
          }   */}
          <View style={styles.container}>
          {!this.state.isEmptyData &&
          <FlatList
            data={this.state.productlist}
            renderItem={({ item }) => (
              
            <View style={styles.productscol}>
              <View style={{flexDirection : 'row', justifyContent : 'flex-end', width:'90%'}}>
                <Text style={styles.pricetext}>$ {item.productPrice.toString()}</Text>
              </View>
              <TouchableOpacity onPress={()=> this.detailProduct(item)} style={{width : '100%'}}>
                <Image source = {{ uri: item.photo_url }} style={{ height:120}}></Image>
              </TouchableOpacity>
              <View style={styles.productfooter} >

                <Text style={styles.footertext}> {item.product_name}</Text>
                <View style={styles.ratingview}>
                  {stars}
                  <Text style={{color : 'white', fontSize : 12}}>, 17 Reviews</Text>                      
                </View>

                <View style={{marginTop : 5}}>
                  <Icon name="chevron-circle-right"  size={20} color="white" />
                </View>
              </View>                      
            </View>              
            )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          />}          
          </View>
        </ScrollView>
        <Tabs 
          gotoAddNewCartPage={() => this.props.navigation.navigate('CartPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchStorePage={() => this.props.navigation.navigate('SearchStorePage')}
          selectTab={this.state.selectTab}
          />
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
  },
  searchcontainer: {
    backgroundColor: 'white',
    borderWidth: 1, //no effect
    shadowColor: 'white', //no effect
    marginLeft : 20,
    marginTop : 20,
    marginRight : 20,
    borderRadius : 10,
   },
   productsrow : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    width : '90%',
    height : 220,
    marginTop : 30

  },
  productscol : {
      flexDirection : 'column',
      borderColor : '#3cc93f',
      borderWidth : 1,
      alignItems : 'center',
      justifyContent : 'flex-end',
      width : '40%',
      height : 220,
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      borderTopLeftRadius : 10,
      margin : 20
  },
  pricetext : {
      color : '#3cc93f',
      fontSize : 14,
      justifyContent : 'flex-end'
  },
  ratingview : {
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : 'center',
      marginTop : 5,
  },
  productfooter : {
      alignItems : 'center',
      backgroundColor : '#43d162',
      height : 70,
      width : '100%',
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20

  },
  footertext : {
      marginTop : 5,
      color : 'white',
      fontSize : 14
  },
  ratingImage: {
      height: 15,
      width: 15,
  }, 
});

