
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabs from '../../components/dispensaries/tab/Tabs';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Divider } from 'react-native-elements';
import productService from '../../services/productService';
import Spinner from 'react-native-loading-spinner-overlay'; 


export default class ProductsDispensariesPage extends Component{
  subs = [];
  constructor(props){
    super(props);
    this.state = {
      selectTab: 'product',
      popupVisible: false,
      isEmptyData : false,
      uid : '',

    };
  }  
  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState({uid : JSON.parse(userinfo).uid});
    });  
    this.getProducts();
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());  
  }
  componentDidMount(){
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {
        this.getProducts();
      }),
      this.props.navigation.addListener("willBlur", () => {
      })
    ];
  }
  getProducts = () =>{
    this.setState({isEmptyData : true});
    productService.getProducts(this.state.uid).then(productsInfo =>{
      var productlist = [];
      productsInfo.forEach(function(product){
        productlist.push(product.val());
      });
      this.setState({productlist : productlist});
      this.setState({isEmptyData : false});
    });  
  }
  editProduct = (product) => {
    let navParam = product;

    this.props.navigation.navigate('EditProductPage', { navParam });
  }

  updateSearch = search => {
    this.setState({ search });
  };
  render(){
    // if(this.state.productlist.length > 0){
    //   this.setState({isLoading : false});
    //   this.setState({isEmptyData : false});
    // }
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
        <View style={{alignItems : 'center', width : '100%'}}>
          <Text style={{fontSize : 22, margin : 20}}>Your Store Front</Text>
        </View>
        <View style={styles.searchview}>
          <Icon name="search"  size={20} color="#37d613" />
          <TextInput placeholder='Search' placeholder="Search my items" style={styles.searchInputText}/>
          <Icon name="plus"  size={20} color="#37d613" onPress={() => this.props.navigation.navigate('AddProductPage')}/>
        </View>

            {this.state.isEmptyData &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }  
        <ScrollView>
          {!this.state.isEmptyData &&
          <FlatList
            data={this.state.productlist}
            renderItem={({ item }) => (
              
            <View style={styles.productscol}>
              <View style={{flexDirection : 'row', justifyContent : 'flex-end', width:'90%'}}>
                <Text style={styles.pricetext}>$ {item.productPrice}</Text>
              </View>
              <TouchableOpacity onPress={()=> this.editProduct(item)} style={{width : '100%'}}>
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
        </ScrollView>
        <Tabs 
          //openPopup={() => {this.setState({ popupVisible: true });}}
          gotoOrderHistoryPage={() => this.props.navigation.navigate('OrderHistoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfileDispensariesPage')}
          selectTab={this.state.selectTab}
          />

          {/* <Dialog
              visible={this.state.popupVisible}
              dialogStyle={{borderTopLeftRadius : 30, borderTopRightRadius : 30}}
              containerStyle={{ justifyContent: 'flex-end'}}
              width={'100%'}
              height={400}
              dialogTitle={
                <View>
                  <View style={styles.dialogHeaderView}>
                    <Image style={{width : 50, height : 50}} source={require('../../components/dispensaries/assets/imgs/driver_avatar.png')} ></Image>
                    <Text style={{fontSize : 20, marginLeft : 20}}>Driver Name Bob D.</Text>
                    <Image style={{width : 40, height : 40 , marginLeft : 20}} source={require('../../components/dispensaries/assets/imgs/message.png')} ></Image>
                    <Image style={{width : 40, height : 40, marginLeft : 10}} source={require('../../components/dispensaries/assets/imgs/phonecall.png')} ></Image>

                  </View>

                </View>

              }
              onTouchOutside={() => {
              this.setState({ popupVisible: true });
              }}
              >
              <DialogContent>
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../components/dispensaries/assets/imgs/location.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>East Central Atlanta</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : '100%', marginLeft : 50 }} />
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../components/dispensaries/assets/imgs/pinpoints.png')} ></Image>
                  <Text style={{fontSize : 16, marginLeft : 20,}}>Little Five Points</Text>
                </View>
                <Divider style={{ backgroundColor: '#a0a3a0', width : 1000}} />
                <View style={{flexDirection:'row', width : '100%', margin : 20}}>
                  <Image source={require('../../components/dispensaries/assets/imgs/car.png')} ></Image>
                  <View>
                    <Text style={{fontSize : 14, marginLeft : 20, color : '#a0a3a0', marginBottom : 5}}>Driver is</Text>
                    <Text style={{fontSize : 16, marginLeft : 20,}}>10 Mins</Text>
                  </View>
                  <View>
                    <Text style={{fontSize : 14, marginLeft : 20, color : '#a0a3a0', marginBottom : 5}}>Gross Order</Text>
                    <Text style={{fontSize : 16, marginLeft : 20,}}>$67.32</Text>
                  </View>
                </View>
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => {this.setState({ popupVisible: false });}}>
                      <Text style={{color : 'white'}}>Accept</Text>
                    </TouchableOpacity>                    
                </View>
                </DialogContent>
          </Dialog>              */}
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
  },
  searchview : {
    flexDirection : 'row',
    borderWidth : 1,
    width : '90%',
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    borderColor : '#8e918e',
    borderRadius : 10,
    marginLeft : 20
  },
  searchInputText : {
    width : '80%',
    height : 50,
    marginLeft : 10

  },
  dialogHeaderView : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    width : '100%',
    height : 80,
    backgroundColor : '#ededed'
  },
  declineBtn : {
    width : 150,
    height : 50,
    borderWidth : 1,
    borderColor : '#a0a3a0',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 20
  },
  acceptBtn : {
    width : 150,
    height : 50,
    borderColor : '#a0a3a0',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#23b825',
    borderRadius : 20
  },
  spinnerTextStyle: {
    color: '#FFF'
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
      fontSize : 16
  },
  ratingImage: {
      height: 15,
      width: 15,
  },   
});

