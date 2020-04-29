
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
   Image, 
   AsyncStorage,
   TextInput,
   ActivityIndicator
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import InputSpinner from 'react-native-input-spinner';
import Textarea from 'react-native-textarea';
import ImagePicker from 'react-native-image-picker';
import productService from '../../services/productService';
import Toast from 'react-native-simple-toast';
import Firebase from '../../config/firebase';
import RNFetchBlob from 'react-native-fetch-blob';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

var renderIf = function(condition, content) {
  if (condition) {
      return content;
  } 
  return (<Image style={styles.camera} source={require('../../assets/imgs/camera.png')} ></Image>);
}
export default class AddProductPage extends Component{
  // state = {
  //   selectTab: 'none'
  // };  
  constructor(props){
    super(props);
    this.state = {
      photo: {},
      photoUri: '',
      uid : '',
      productPrice : '',
      ourfee : '',
      grossprice : '',
      product_name : '',
      product_tags : '',
      product_description : '',
      product_quantity : '',
      isLoading : false
    }; 
  } 
  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState({uid : JSON.parse(userinfo).uid});
    });  
  }
  handleProductPrice = (event) => {    
    const {eventCount, target, text} = event.nativeEvent;
    let productPrice = parseFloat(text);
    let ourfee = productPrice * 0.3;
    let grossprice = productPrice + ourfee;
    this.setState({productPrice:productPrice});
    this.setState({ourfee:ourfee});
    this.setState({grossprice:grossprice});

  };  
  chooseFile = () => {
    var options = {
      title: 'Select Dispensary Photo',
      maxWidth : 300,
      maxHeight : 300,
      quality : 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        let sourceUri = { uri: 'data:image/jpeg;base64,' + response.uri };
        this.setState({
            photo: source,
            photoUri: response.uri
        });
      }
    });
  }; 
  registerProduct() {

    if(this.state.productPrice == ''){
      Toast.showWithGravity('Please insert product price.', Toast.SHORT , Toast.TOP);
      return;
    }     
    if(this.state.product_description == ''){
      Toast.showWithGravity('Please insert product description.', Toast.SHORT , Toast.TOP);
      return;
    }  
    this.setState({ isLoading: true });
    let addparam = {
      product_name : this.state.product_name,
      productPrice: this.state.productPrice,
      product_description : this.state.product_description,
      product_tags : this.state.product_tags,
      ourfee : this.state.ourfee,
      grossprice : this.state.grossprice,
      product_quantity : this.state.product_quantity,
      uid : this.state.uid
    }

    if(this.state.photoUri == ''){
      productService.registerProduct(addparam).then(response =>{
        this.setState({isLoading: false});
        this.props.navigation.navigate('ProductsDispensariesPage')
      });   
    }else{
        this.uploadImage(this.state.photoUri)
        .then(url => { 
          addparam.photo_url = url;
          productService.registerProduct(addparam).then(response =>{
            this.setState({isLoading: false, });
            this.props.navigation.navigate('ProductsDispensariesPage');
          })
        }).catch(error => console.log(error));
        //
    }  
  }

  uploadImage = ( uri, mime = 'application/octet-stream') => {

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      let timestamp = Date.now();
      const ext = uri.split('.').pop(); 
      const filename = timestamp.toString() + '.' + ext;

      const imageRef = Firebase.storage().ref().child('dispensary/productImage/' + filename);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: 'image/jpeg' })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  };  
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack('')}>
          <View style={{flexDirection : 'row'}}>
            <View style={styles.backBtnView}>
              <Icon name="arrow-left"  size={30} color="white"/>
            </View>
            <View style={styles.headerText}>
              <Text style={{fontSize:20, fontWeight : '400'}}>Add an Item to Your Store</Text>
            </View>
            
          </View>        
        </TouchableOpacity>          
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.chooseFile.bind(this)}>
              <View style={styles.logopicWrap}>
              {renderIf(this.state.photo.uri,
                <Image style={styles.logopic} source={{ uri: this.state.photo.uri }} ></Image>
              )}                
              </View>
            </TouchableOpacity>
            <View style={{ width :  '100%',  alignItems : 'center', justifyContent : 'center', flexDirection : 'row'}}>
              <Text style={{fontSize : 16, }}>Quantity in Stock</Text> 
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
                  onChange={(num)=>{this.setState({product_quantity : num})}} />   
              </View>   
              <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center',  width : '100%'}}>
                <View style={{alignItems : 'center', justifyContent : 'center', margin : 5, width : '25%'}}> 
                  <Text style={{marginBottom : 10, color : '#8c8989'}}>Our fees</Text>
                  <TouchableOpacity style={styles.tipitem}>
                    <Text style={{color : '#8c8989'}}>$ {this.state.ourfee}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems : 'center', justifyContent : 'center', margin : 5, width : '25%'}}> 
                  <Text style={{marginBottom : 10, color : '#8c8989'}}>Product price</Text>
                  {/* <TouchableOpacity style={styles.tipitem}>
                      <Text style={{color : '#8c8989'}}>$50</Text>
                  </TouchableOpacity> */}
                  <View style={styles.productPriceView}>
                    <Text style={{marginRight : 10}}>$</Text>
                    <TextInput style={{width : '50%', height : 130}} onChange={this.handleProductPrice} value={this.state.productPrice}></TextInput>
                  </View>
                </View>
                <View style={{alignItems : 'center', justifyContent : 'center', margin : 5, width : '25%'}}> 
                  <Text style={{marginBottom : 10, color : '#8c8989'}}>Gross price</Text>
                  <TouchableOpacity style={styles.tipitem}>
                <Text style={{color : '#8c8989'}}>$ {this.state.grossprice}</Text>
                  </TouchableOpacity>
                </View>                 
              </View>    
              <View style={{alignItems : 'flex-start', marginTop : 10, marginLeft : '10%', width : '80%'}}>
                <Text> Name of Product</Text>  
                <View style={styles.textinputview}> 
                  <TextInput style={styles.textinput} placeholder="Enter items name"
                    onChangeText={ product_name=> this.setState({product_name})}
                  />
                </View>
              </View>   
              <View style={{alignItems : 'flex-start', marginTop : 10,  marginLeft : '10%', width : '80%'}}>
                <Text> Tags</Text>  
                <View style={styles.textinputview}> 
                  <TextInput style={styles.textinput} placeholder="Enter Relevant Search Tags item..."
                  onChangeText={ product_tags=> this.setState({product_tags})}
                  />
                </View>
              </View>   
              <Textarea
                containerStyle={styles.textareaContainer}
                // style={styles.textarea}
                onChangeText={ product_description=> this.setState({product_description})}
                // defaultValue={this.state.text}
                maxLength={200}
                placeholder={' Enter Item description...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                />                  
          {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }  
            <TouchableOpacity onPress={() => this.registerProduct()} style={{alignItems : 'center', justifyContent : 'center'}}>
              <View style={styles.addcart}>
                <Text style={styles.addcarttext}>Add to Store</Text>
              </View>
            </TouchableOpacity>              
          </View>
        </ScrollView>
        {/* <Tabs 
          gotoProductsPage={() => this.props.navigation.navigate('ProductsDispensariesPage')}
          gotoOrderHistoryPage={() => this.props.navigation.navigate('OrderHistoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfileDispensariesPage')}
          selectTab={this.state.selectTab}
          />        */}
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
  },
  backBtnView : {
    flexDirection : 'row',
    width : '20%',
    height : 40,
     backgroundColor : '#23b825',
    marginTop : 20,
    alignItems : 'center',
    justifyContent : 'center'
  } ,
  headerText : {
    flexDirection : 'row',
    width : '70%',
    height : 40,
    alignItems : 'center',
    marginTop : 20,
    justifyContent : 'center'
  } , 
  betterview : {
    flexDirection : 'row', 
    justifyContent : 'center'
  },
  tipitem : {
      width : '95%',
      height : 30,
      borderWidth : 1,
      borderColor : '#8c8989',
      alignItems : 'center',
      justifyContent : 'center',
      borderRadius : 5,
  },   
  textinputview : {
      alignItems : 'center',
      width : '100%',
      height: 50,
      borderRadius:20,
      borderColor : '#b3b0ad',
      borderWidth : 1,
      marginTop : 10
  },   
  textinput : {
      width : 300,
      height: 50,
  },        
  textareaContainer : {
      
      borderWidth : 1,
      borderColor : '#b3b3b3',
      width : '80%',
      height : 130,
      marginLeft : '10%',
      marginTop : 20
  },
  addcarttext : {
      color : 'white',
      fontSize : 22,
      fontWeight : '400'
  },
  addcart: {
      backgroundColor:'#23b825',
      width : 300,
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
  logopic: {
      width : '95%',
      height : 180,
      borderRadius : 10,

  },
  camera : {
    width : 80,
    height : 80,
    // marginTop : -30
  },
  logopicWrap : {
    width : '80%',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius: 10,
    height : 200,
    marginLeft : '10%',
    marginTop : 20,
    marginBottom : 20,
    borderWidth : 2,
    borderColor : '#23b825',

  },
  productPriceView : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
    height : 30,
    borderWidth : 1,
    borderColor : '#8c8989',
    borderRadius : 5,
  }    
});

