
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,  
  Image, 
  Platform,
  AsyncStorage,
  
  ActivityIndicator,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import * as BlinkIDReactNative from 'blinkid-react-native';
import ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import userService from '../../services/userService';
import Toast from 'react-native-simple-toast';
import Firebase from '../../config/firebase';
import RNFetchBlob from 'react-native-fetch-blob';

// import ImagePicker from 'react-native-image-crop-picker';
const licenseKey = Platform.select({
      ios: "sRwAAAEWb3JnLmNhbm5hZ29hcHAuY2FubmFnb7oKGGEMFG/Mig+ZqM4BkpkblPOjJvekNhOEZoSbFUDXusSO6GDEuDALAYLFfzb4+X6QtmcL8n1AjC2HhxKhNPKzmMgtB5y6MYoh9zKDDvq9v35Nwxd9Qzp3smjqsn7jOstfw3FINg6odjcBJ6to2rbe9uOYTjzmKvAR8Ro/2AHZCtUh96zVTe1QLvMGfrfwRDReLMwFU3A2XL2kXOmebFy0entIdZGpkfx549Ptm+hmDZtRgBVJ1nrFIQeRRCew+SSqz3U3jsV9kjpQ3Ow9Ug==" ,
      android: "sRwAAAAWb3JnLmNhbm5hZ29hcHAuY2FubmFnb0FNmcPu1wsl0gJydDDVDqzLo1nmtvd4XGQqhQSoSuQxzG5ilihCQZN0BqSgJMsgFYydv+i6fqnbuB298M6hU1NEt9k9iXniaMwWza+JmOyC1VtzF97k+enZpSUOzTJefDlglaWuPEIzIaI1Ukq0Pl1iP14wCToPK+mGRvXqbGYFJGpu8108GhhchRMNAec33/IryN9kiM58Y9g/2YaVXSpjXDVoKmGAbMJHxeJd7qOEYnO38xRJ2CsZu7LibKsUm7dcd4YMXJef3eISiOzlkw==" 
  });

var renderIf = function(condition, content) {
  if (condition) {
      return content;
  } 
  return (<Image style={styles.camera} source={require('../../assets/imgs/camera.png')} ></Image>);
}
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
export default class SignupPage extends Component{

  constructor(props){
      super(props);
      this.state = {
        photo: {},
        photoUri: '',
        first_name : '',
        last_name : '',
        email : '',
        address : '',
        zipcode : '',
        password : '',
        phonenumber : '',
        license_number : '',
        usertype : 0,
        deviceToken : '',
        validated : true,
        isChecked : false,
        isLoading: false,
        isToast : false,
        uploading : false
    };    
  } 
  UNSAFE_componentWillMount(){
  }    
 
  chooseFile = () => {
    var options = {
      title: 'Select User Photo',
      quality : 0.5,
      maxWidth : 200,
      maxHeight : 200,
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
  uploadImage = (uid, uri, mime = 'application/octet-stream') => {

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const ext = uri.split('.').pop(); 
      const filename = uid + '.' + ext;

      const imageRef = Firebase.storage().ref().child('consumers/userImage/' + filename);

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


  async registerUser() {
    if(this.state.first_name == ''){
      Toast.showWithGravity('Please try to scan  license card.', Toast.SHORT , Toast.TOP);
      return;
    }

    if(this.state.email == ''){
      Toast.showWithGravity('Please insert email.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.password == ''){
      Toast.showWithGravity('Please insert password.', Toast.SHORT , Toast.TOP);
      return;
    }     
    if(this.state.zipcode == ''){
      Toast.showWithGravity('Please insert zip code.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.phonenumber == ''){
      Toast.showWithGravity('Please insert phone number.', Toast.SHORT , Toast.TOP);
      return;
    } 
    
    this.setState({ isLoading: true });
    let userParam = {
      first_name : this.state.first_name,
      last_name : this.state.last_name,
      email : this.state.email,
      address : this.state.address,
      zipcode : this.state.zipcode,
      password : this.state.password,
      phonenumber : this.state.phonenumber,
      license_number : this.state.license_number,
      deviceToken : '',
      usertype : 'consumer', 
      updateId : '',
      active : 'active'
    };

    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) =>{
      userParam.uid = res.user.uid;
      console.log('userparam', userParam);
      if(this.state.photoUri == ''){
        userService.registerConsumer(userParam).then(response =>{
          this.setState({isLoading: false, });
          this._storeData(userParam);
          this.props.navigation.navigate('ProductCategoryPage')
        });   
      }else{
        this.uploadImage(res.user.uid, this.state.photoUri)
        .then(url => { 
          userParam.photo_url = url;
          userService.registerConsumer(userParam).then(response =>{
            this.setState({isLoading: false, });
            this._storeData(response);
            this.props.navigation.navigate('ProductCategoryPage')
          });   
        }).catch(error => console.log(error));
      }  
    }).catch(error => {
      this.setState({isLoading: false});
      Toast.showWithGravity(error.message, Toast.SHORT , Toast.TOP);
    });
  }

  async _storeData(userParam) {
    try {
     await AsyncStorage.setItem('userInfo', JSON.stringify(userParam));
    } catch (error) {
      console.log(error.message);
    }
  }


  async scan() {
    console.log("scam startomg");
    try {
      var blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
      blinkIdCombinedRecognizer.returnFullDocumentImage = true;
      blinkIdCombinedRecognizer.returnFaceImage = true;
  
      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
          new BlinkIDReactNative.BlinkIdOverlaySettings(),
          new BlinkIDReactNative.RecognizerCollection([blinkIdCombinedRecognizer/*, mrtdSuccessFrameGrabber*/]),
          licenseKey
      );
  
      if (scanningResults) {
          for (let i = 0; i < scanningResults.length; ++i) {
              this.setState({first_name : scanningResults[0].firstName});
              if(scanningResults[0].last_name == undefined)
                this.setState({last_name : ''});
              else
                this.setState({last_name : scanningResults[0].last_name});
              this.setState({license_number : scanningResults[0].documentNumber});
              this.setState({address : scanningResults[0].address});
          }
      }
    } catch (error) {
                console.log(error);
    }
  } 


  render(){
  
    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled  /*keyboardVerticalOffset={30}*/>                 
      <SafeAreaView>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninPage')}>
         <View style={styles.backBtnView}>
         <Icon name="arrow-left"  size={30} color="white"/>
         </View>        
       </TouchableOpacity>     

      <ScrollView >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.chooseFile()} >
            <View style={styles.logopicWrap} >
                {renderIf(this.state.photo.uri,
                    <Image style={styles.logopic} source={{ uri: this.state.photo.uri }} ></Image>
                )}

            </View>
          </TouchableOpacity>

          <View style={styles.textinputview}> 
            <Icon name="mail"  size={20} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Email Address"
                onChangeText={ email=> this.setState({email})}  
            />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="lock"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true}
                onChangeText={ password=> this.setState({password})}  
            />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="lock"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Zip code"
                onChangeText={ zipcode=> this.setState({zipcode})}  
            />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="phone"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Mobile number"
                onChangeText={ phonenumber=> this.setState({phonenumber})} 
            />
          </View>
          <TouchableOpacity onPress={this.scan.bind(this)}>
            <View style={styles.driverlicenseview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a8a8a7'}} >Scan Driver license</Text>
            </View>

          </TouchableOpacity>
          <View style={styles.checkboxview}> 
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                this.setState({
                    isChecked:!this.state.isChecked
                })
                }}
                isChecked={this.state.isChecked}
                rightText={"By checking this I agree to Cannago's Terms & Conditions"}
                rightTextStyle={{color : '#9c9c9c'}}
                />                    
          </View>       
          {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }       
          <TouchableOpacity onPress={() => this.registerUser()}>
            <View style={styles.signinBtn}>
              <Text style={styles.signiText}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>

      </KeyboardAvoidingView>
    );

  }
  
}

const styles = StyleSheet.create({
  container : {
      alignItems : 'center',
  },
  backBtnView : {
    width : '20%',
    height : 40,
    backgroundColor : '#23b825',
    alignItems : 'center',
    justifyContent : 'center'
  },

  logopic: {
    width : 150,
    height : 150,
    borderRadius: 100,
},

logopicWrap : {
    alignItems : 'center',
    justifyContent : 'center',
    borderWidth : 3,
    borderColor : '#2cc94e',
    borderRadius: 100,
    width : 170,
    height : 170,
    marginBottom : 20
},
camera : {
  width : 80,
  height : 80,
},    
checkboxview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
    height: 60,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 0
},   
textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
    height: 60,
    marginTop : 20,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 1
}, 
driverlicenseview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
    height: 60,
    marginTop : 20,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 1

},          
icon : {
    marginLeft : 20,
    marginRight : 20
},
textinput : {
    width : 250,
    height: 60,
},
signinBtn: {
    marginTop : 10,
    marginBottom : 30,
    backgroundColor:'#23b825',
    width : 320,
    height: 50,
    borderRadius:20,
    justifyContent : 'center',
    alignItems : 'center',
    shadowColor: '#919090',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    elevation: 10,  
},
signiText : {
    color : 'white',
    fontSize : 22,
    fontWeight : '400'
}  
});

