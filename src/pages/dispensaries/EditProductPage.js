
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { ListItem} from 'react-native-elements';

import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Feather';
import InputSpinner from 'react-native-input-spinner';
import Firebase from '../../config/firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import productService from '../../services/productService';
import Toast from 'react-native-simple-toast';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class EditProductPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectTab: 'none',
      photo: {},
      photoUri: '',

      uid : '',
      productId : '',
      productPrice : '',
      ourfee : '',
      grossprice : '',
      product_name : '',
      product_tags : '',
      product_description : '',
      product_quantity : '',
      photo_url : '',
      isLoading : false      
    };  
    
  } 
  UNSAFE_componentWillMount(){
    let productInfo = this.props.navigation.state.params.navParam;
    this.setState(productInfo);
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
            photoUri: response.uri,
            photo_url : response.uri
        });
      }
    });
  }; 
  updateProduct() {

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
      productId : this.state.productId,
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
      addparam.photo_url = this.state.photo_url;
      productService.updateProduct(addparam).then(response =>{
        this.setState({isLoading: false});
        this.props.navigation.navigate('ProductsDispensariesPage')
      });   
    }else{
        this.uploadImage(this.state.photoUri)
        .then(url => { 
          addparam.photo_url = url;
          productService.updateProduct(addparam).then(response =>{
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
        <TouchableOpacity onPress={() => this.props.navigation.goBack('')}>
          <View style={{flexDirection : 'row'}}>
            <View style={styles.backBtnView}>
              <Icon name="arrow-left"  size={30} color="white"/>
            </View>
            <View style={styles.headerText}>
              <Text style={{fontSize:20, fontWeight : '400'}}>Edit an Item to Your Store</Text>
            </View>
            
          </View>        
        </TouchableOpacity>          

        <ScrollView>
        <TouchableOpacity onPress={this.chooseFile.bind(this)}>
          <View style={styles.logopicWrap}>
            {this.state.photo_url == '' ? 
            <Image style={styles.logopic} source={require('../../assets/imgs/camera.png')} ></Image> :
            <Image style={styles.logopic} source={{ uri: this.state.photo_url }} ></Image>}
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
              value={this.state.product_quantity}
              height={30}
              width={100}
              style={{margin : 5}}
              onChange={(num)=>{this.setState({product_quantity : num})}} />   
          </View>   
          <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center', width : '100%'}}>
            <View style={{alignItems : 'center', justifyContent : 'center', margin : 5 ,width : '25%'}}> 
              <Text style={{marginBottom : 10, color : '#8c8989'}}>Our fees</Text>
              <TouchableOpacity style={styles.tipitem}>
                <Text style={{color : '#8c8989'}}>$ {this.state.ourfee}</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems : 'center', justifyContent : 'center', margin : 5, width : '25%'}}> 
              <Text style={{marginBottom : 10, color : '#8c8989'}}>Product price</Text>
              <View style={styles.productPriceView}>
                <Text style={{marginRight : 10}}>$</Text>
                <TextInput style={{width : '50%', height : 130}} onChange={this.handleProductPrice} value={this.state.productPrice.toString()}></TextInput>
              </View>
            </View>
            <View style={{alignItems : 'center', justifyContent : 'center', margin : 5, width : '25%'}}> 
              <Text style={{marginBottom : 10, color : '#8c8989'}}>Gross price</Text>
              <TouchableOpacity style={styles.tipitem}>
                  <Text style={{color : '#8c8989'}}>$ {this.state.grossprice}</Text>
              </TouchableOpacity>
            </View>                 
          </View>    
            <View style={{alignItems : 'flex-start', marginLeft : '10%', marginTop : 10, width : '80%'}}>
              <Text> Name of Product</Text>  
              <View style={styles.textinputview}> 
                <TextInput style={styles.textinput} value={this.state.product_name} placeholder="Enter items name"
                  onChangeText={ product_name=> this.setState({product_name})}/>
              </View>
            </View>   
            <View style={{alignItems : 'flex-start', marginLeft : '10%', marginTop : 10, width : '80%'}}>
              <Text> Tags</Text>  
              <View style={styles.textinputview}> 
                <TextInput style={styles.textinput} value={this.state.product_tags} placeholder="Enter Relevant Search Tags item..."
                  onChangeText={ product_tags=> this.setState({product_tags})}/>
              </View>
            </View>   
             <Textarea
                containerStyle={styles.textareaContainer}
                // style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={200}
                placeholder={' Enter Item description...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                value={this.state.product_description}
                onChangeText={ product_description=> this.setState({product_description})}
                />          
          <Text style={{marginLeft : '10%', marginTop : 30, fontSize : 20}}>Read Reviews:</Text>
          <View style={styles.listitem}>
            <ListItem
                title='Naomi N.'
                subtitle={
                    <View style={styles.subtitleView}>
                        {stars}
                        <Text style={styles.ratingText}>5 months ago</Text>
                    </View>
                }
                containerStyle={styles.listitem}
                // leftAvatar={{ source: require('../../components/dispensaries/assets/imgs/avatar1.png') }}
                />
            </View>
            <Text style={{marginLeft : '10%', fontSize : 14}}>This is my third time try this oil. I loved it.</Text>
            {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }  
            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', width : '100%'}}>
              <TouchableOpacity onPress={this.props.gotoProductsPage} style={{alignItems : 'center', justifyContent : 'center', width : '50%', paddingLeft : '10%', paddingRight : '10%'}}>
                  <View style={styles.deleteitemBtn}>
                      <Text style={styles.addcarttext}>Delete</Text>
                  </View>
              </TouchableOpacity>      
              <TouchableOpacity onPress={() => this.updateProduct()} style={{alignItems : 'center', justifyContent : 'center', width : '50%',  paddingLeft : '10%', paddingRight : '10%'}}>
                  <View style={styles.addcart}>
                      <Text style={styles.addcarttext}>Update</Text>
                  </View>
              </TouchableOpacity>                      
            </View>  
        </ScrollView>
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
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 5
  },  
  listitem : {
      width : '80%',
      backgroundColor : 'transparent',
      alignItems : 'center',
      justifyContent : 'center'
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
    textAlign: 'right'
  },
  ratingImage: {
    height: 20,
    width: 20
  },
  addcarttext : {
    color : 'white',
    fontSize : 20,
    fontWeight : '400'
  },
  addcart: {
      backgroundColor:'#23b825',
      width : '100%',
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
  deleteitemBtn: {
    backgroundColor:'#d15656',
    width : '100%',
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
      marginLeft : '10%',
      borderWidth : 1,
      borderColor : '#b3b3b3',
      width : '80%',
      height : 130,
      marginTop : 20
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
  },
  logopicWrap : {
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    borderWidth : 2,
    borderColor : '#23b825',
    width : '80%',
    marginLeft : '10%',
    height : 200,
    marginTop : 20,
    marginBottom : 20
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

