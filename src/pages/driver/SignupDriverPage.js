
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  View
} from 'react-native';
import * as BlinkIDReactNative from 'blinkid-react-native';

import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'
import ImagePicker from 'react-native-image-picker';
import Firebase from '../../config/firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import userService from '../../services/userService';

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
const screenWidth = Math.round(Dimensions.get('window').width);
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class SignupDriverPage extends Component{

 constructor(props){

    super(props);
    this.state={
      isChecked: false,
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
      vechicle_name : '',
      vechicle_model : '',
      vechicle_color : '',
      vechicle_number : '',
      companyname : '',
      agreement : '',
      isLoading: false,


    }  
  }
  chooseFile = () => {
    var options = {
      title: 'Select Driver Photo',
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

  async registerDriver() {

    if(this.state.first_name == ''){
      Toast.showWithGravity('Please try to scan  license card.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.email == ''){
      Toast.showWithGravity('Please insert email.', Toast.SHORT , Toast.TOP);
      return;
    }    
    if(this.state.email == ''){
      Toast.showWithGravity('Please insert password.', Toast.SHORT , Toast.TOP);
      return;
    }   
    this.setState({isLoading: true});
    

   
    let param = {
      owner_info : {
        first_name: this.state.first_name,
        last_name : this.state.last_name,
        address : this.state.address,
        zipcode : this.state.zipcode,
        license_number : this.state.license_number,
        phonenumber : this.state.phonenumber,
        email : this.state.email,
        password : this.state.password
      },
      vechicle_info : {
        vechicle_name : this.state.vechicle_name,
        vechicle_model : this.state.vechicle_model,
        vechicle_color : this.state.vechicle_color,
        vechicle_number : this.state.vechicle_number
      },
      tax_info : {
        companyname : this.state.companyname,
        agreement : this.state.agreement,
      },
      deviceToken : '', 
      usertype : 'driver', 
    };

    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) =>{
      console.log("u_id", res.user.uid);
      param.uid = res.user.uid;
      if(this.state.photoUri == ''){
        userService.registerDriver(param).then(response =>{
          this.setState({isLoading: false});
          this._storeData(param);
          this.props.navigation.navigate('ProfileDriverPage');

        });   
      }else{
        this.uploadImage(res.user.uid, this.state.photoUri)
        .then(url => { 
          param.photo_url = url;
          userService.registerDriver(param).then(response =>{
            this.setState({isLoading: false, });
            this._storeData(param);
            this.props.navigation.navigate('ProfileDriverPage');
          });   
        }).catch(error => console.log(error));
      }  
    }).catch(error => {
      this.setState({isLoading: false});
      Toast.showWithGravity(error.message, Toast.SHORT , Toast.TOP);
    });
  }

  uploadImage = (uid, uri, mime = 'application/octet-stream') => {

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const ext = uri.split('.').pop(); 
      const filename = uid + '.' + ext;

      const imageRef = Firebase.storage().ref().child('drivers/driverImage/' + filename);

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
  async _storeData(userParam) {
    try {
     await AsyncStorage.setItem('userInfo', JSON.stringify(userParam));
    } catch (error) {
      console.log(error.message);
    }
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninDriverPage')}>
        <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center'}}>
          <View style={styles.backBtnView}>
            <Icon name="arrow-left"  size={30} color="white"/>
          </View>
          <View style={{width : '80%'}}></View>   
        </View>
     
        </TouchableOpacity>                
        <ScrollView>
            <TouchableOpacity onPress={this.chooseFile.bind(this)}>
              <View style={styles.logopicWrap}>
                {renderIf(this.state.photo.uri,
                  <Image style={styles.logopic} source={{ uri: this.state.photo.uri }} ></Image>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.textinputview}> 
              <Icon name="envelope-o"  size={20} color="#37d613" style={styles.icon}/>
              <TextInput style={styles.textinput} placeholder="Email Address" 
                onChangeText={ email=> this.setState({email})}/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="unlock-alt"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true}
                  onChangeText={ password=> this.setState({password})}/>
            </View>

            <View style={styles.textinputview}> 
                <Icon name="location"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Zip code"
                 onChangeText={ zipcode=> this.setState({zipcode})}
                />
                
            </View>
            <View style={styles.textinputview}> 
                <Icon name="phone"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Mobile number"
                onChangeText={ phonenumber=> this.setState({phonenumber})}
                />
            </View>
            <TouchableOpacity onPress={this.scan.bind(this)}>
              <View style={styles.driverlicenseview}> 
                  <Icon name="drivers-license-o"  size={20} color="#37d613" style={styles.icon}/>
                  <Text style={{color : '#a8a8a7'}} >Scan Driver license</Text>
              </View>
            </TouchableOpacity>            

            <View style={{alignItems : 'flex-start', marginTop : 20}}> 
                <Text style={{fontSize : 18}}> Vechicle Information</Text>
            </View>   
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Vechicle Name"
                 onChangeText={ vechicle_name=> this.setState({vechicle_name})}
                />
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Vechicle Model"
                  onChangeText={ vechicle_model=> this.setState({vechicle_model})}
                />
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Vechicle Color"
                  onChangeText={ vechicle_color=> this.setState({vechicle_color})}
                />
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Vechicle License Plate Number"
                  onChangeText={ vechicle_number=> this.setState({vechicle_number})}
                />
            </View>
            <View style={{alignItems : 'flex-start', marginTop : 20}}> 
                <Text style={{fontSize : 18}}> Tax Information</Text>
            </View>   
            {/* <Divider style={{ marginTop: 20, backgroundColor : 'black'}} /> */}
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="Business entity/Company name"
                  onChangeText={ companyname=> this.setState({companyname})}
                />
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} placeholder="109 Agreement"
                  onChangeText={ agreement=> this.setState({agreement})}
                />
            </View>
            <View style={styles.checkboxview}> 
                <CheckBox
                    style={{flex: 1, padding: 10}}
                    onClick={()=>{
                    this.setState({
                        isChecked:!this.state.isChecked
                    })
                    }}
                    isChecked={this.state.isChecked}
                    rightText={"By checking this agree Cannago's Terms & Conditions"}
                    rightTextStyle={{color : '#9c9c9c', fontSize : 10}}
                    />                    
            </View>  
            {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }                    
            <TouchableOpacity onPress={() => this.registerDriver()}>
                <View style={styles.signinBtn}>
                    <Text style={styles.signiText}>Create Account</Text>
                </View>
            </TouchableOpacity>
            <View style={{height : 40}}></View>
        </ScrollView>

      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
      alignItems : 'center',
      flex : 1,
      marginBottom : 20
  },
  backBtnView : {
    width : '20%',
    height : 40,
    backgroundColor : '#23b825',
    marginTop : 20,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  logopic: {
    width : 160,
    height : 160,
    borderRadius : 100

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
  checkboxview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth - 60,
    height: 60,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 0
},   
textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth - 60,
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
      width : screenWidth - 100,
      height: 60,
  },
  signinBtn: {
      marginTop : 10,
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
  },
  signiText : {
      color : 'white',
      fontSize : 22,
      fontWeight : '400'
  } ,
  driverlicenseview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth - 60,
    height: 60,
    marginTop : 20,
    borderRadius:20,
    borderColor : '#b3b0ad',
    borderWidth : 1

},      
});

