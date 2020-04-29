
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import { Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import userService from '../../services/userService';
import Firebase from '../../config/firebase'
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var renderIf = function(condition, content) {
  if (condition) {
      return content;
  } 
  return (<Image style={styles.camera} source={require('../../assets/imgs/camera.png')} ></Image>);
}
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class SignupDispensariesPage extends Component{

 constructor(props){

    super(props);
    this.state={
      isChecked: 'false',
      photo: {},
      photoUri: '',
      first_name: '',
      last_name : '',
      phonenumber : '',
      email : '',
      storename : '',
      dispensary_email : '',
      dispensary_pwd : '',
      dispensary_address : '',
      dispensary_phonenum : '',
      dispensary_hour : '',
      companyname : '',
      feinumber : '',
      isLoading: false,
    }  
  }
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

  async registerDispensary() {
    if(this.state.first_name == ''){
      Toast.showWithGravity('Please insert first name.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.last_name == ''){
      Toast.showWithGravity('Please insert last_name.', Toast.SHORT , Toast.TOP);
      return;
    }     
    if(this.state.email == ''){
      Toast.showWithGravity('Please insert owner email.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.phonenumber == ''){
      Toast.showWithGravity('Please insert owner phone number.', Toast.SHORT , Toast.TOP);
      return;
    }  
    if(this.state.storename == ''){
      Toast.showWithGravity('Please insert dispensary name.', Toast.SHORT , Toast.TOP);
      return;
    }     
    if(this.state.dispensary_email == ''){
      Toast.showWithGravity('Please insert dispensary email.', Toast.SHORT , Toast.TOP);
      return;
    }     
    if(this.state.dispensary_pwd == ''){
      Toast.showWithGravity('Please insert dispensary password.', Toast.SHORT , Toast.TOP);
      return;
    }  
    if(this.state.dispensary_address == ''){
      Toast.showWithGravity('Please insert dispensary address.', Toast.SHORT , Toast.TOP);
      return;
    }      
    if(this.state.dispensary_phonenum == ''){
      Toast.showWithGravity('Please insert dispensary phone number.', Toast.SHORT , Toast.TOP);
      return;
    }    
            
    this.setState({ isLoading: true });

    let dispensaryParam = {
      owner_info : {
        first_name: this.state.first_name,
        last_name : this.state.last_name,
        phonenumber : this.state.phonenumber,
        email : this.state.email
      },
      dispensary_info : {
        storename : this.state.storename,
        dispensary_email : this.state.dispensary_email,
        dispensary_pwd : this.state.dispensary_pwd,
        dispensary_address : this.state.dispensary_address,
        dispensary_phonenum : this.state.dispensary_phonenum,
        dispensary_hour : this.state.dispensary_hour
      },
      tax_info : {
        companyname : this.state.companyname,
        feinumber : this.state.feinumber,
      },
      token : token,
      usertype : 'dispensary'
    };

    Firebase.auth().createUserWithEmailAndPassword(this.state.dispensary_email, this.state.dispensary_pwd)
    .then((res) =>{
      dispensaryParam.uid = res.user.uid;

      if(this.state.photoUri == ''){
        userService.registerDispensary(dispensaryParam).then(response =>{
          this.setState({isLoading: false});
          this._storeData(dispensaryParam);
          this.props.navigation.navigate('ProductsDispensariesPage')
        });   
      }else{
        this.uploadImage(res.user.uid, this.state.photoUri)
        .then(url => { 
          dispensaryParam.photo_url = url;
          userService.registerDispensary(dispensaryParam).then(response =>{
            this.setState({isLoading: false, });
            this._storeData(dispensaryParam);
            this.props.navigation.navigate('ProductsDispensariesPage')
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

      const imageRef = Firebase.storage().ref().child('dispensary/dispensaryImage/' + filename);

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
          <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center'}}>
            <TouchableOpacity style={styles.backBtnView} onPress={() => this.props.navigation.navigate('SigninDispensariesPage')}>
              <Icon name="arrow-left"  size={30} color="white"/>
            </TouchableOpacity>                
            <View style={{width : '80%'}}></View>   
          </View>
        <ScrollView>
          <TouchableOpacity onPress={this.chooseFile.bind(this)}>
            <View style={styles.logopicWrap}>
              {renderIf(this.state.photo.uri,
                <Image style={styles.logopic} source={{ uri: this.state.photo.uri }} ></Image>
              )}
            </View>
          </TouchableOpacity>
          <View style={{alignItems : 'flex-start'}}> 
            <Text style={{fontSize : 18}}> Owner's Information</Text>
          </View>   
          <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
          <View style={styles.textinputview}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="First Name" onChangeText={ first_name=> this.setState({first_name})}/>
          </View>
          <View style={styles.textinputview}> 
            <Icon name="user"  size={20} color="#37d613" style={styles.icon} />
            <TextInput style={styles.textinput} placeholder="Last Name" onChangeText={ last_name=> this.setState({last_name})}/>
          </View>
          <View style={styles.textinputview}> 
            <Icon name="mail"  size={20} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Owner's Email Address" onChangeText={ email=> this.setState({email})}/>
          </View>
          <View style={styles.textinputview}> 
            <Icon name="phone"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Owner's Mobile number" onChangeText={ phonenumber=> this.setState({phonenumber})}/>
          </View>
          <View style={{alignItems : 'flex-start', marginTop : 20}}> 
            <Text style={{fontSize : 18}}> Dispensary Information</Text>
          </View>   
          <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
          <View style={styles.textinputview}> 
            <Icon name="package"  size={20} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Disensary  Storename" 
              onChangeText={ storename=> this.setState({storename})} />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="mail"  size={20} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Dispensary Email Address" 
              onChangeText={ dispensary_email=> this.setState({dispensary_email})}/>
          </View>
          <View style={styles.textinputview}> 
            <Icon name="lock"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true}
              onChangeText={ dispensary_pwd=> this.setState({dispensary_pwd})} />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="phone"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Dispensary Mobile number" 
              onChangeText={ dispensary_phonenum=> this.setState({dispensary_phonenum})} />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="map-pin"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Dispensary Address" 
              onChangeText={ dispensary_address=> this.setState({dispensary_address})} />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="watch"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Dispensary Hour"
              onChangeText={ dispensary_hour=> this.setState({dispensary_hour})} />
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
              rightText={"By checking i am authorize signatory of this business with the power to commit to binding agreement"}
              rightTextStyle={{color : '#9c9c9c', fontSize : 10}}
              />                    
          </View>     
          <View style={{alignItems : 'flex-start', marginTop : 20}}> 
              <Text style={{fontSize : 18}}> Tax Information</Text>
          </View>   
          <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
          <View style={styles.textinputview}> 
              <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
              <TextInput style={styles.textinput} placeholder="Business entity/Company name"
                onChangeText={ companyname=> this.setState({companyname})} />
          </View>
          <View style={styles.textinputview}> 
              <Icon name="tablet"  size={20} color="#37d613" style={styles.icon}/>
              <TextInput style={styles.textinput} placeholder="FEIN(Federal Employer Identification Number)"
              onChangeText={ feinumber=> this.setState({feinumber})} />
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
          <TouchableOpacity onPress={() => this.registerDispensary()}>
            <View style={styles.signinBtn}>
              <Text style={styles.signiText}>Create Account</Text>
            </View>
          </TouchableOpacity>    
              
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
    width : screenWidth - 70,
    height : 170,
    borderRadius : 10
  },
  camera : {
    width : 80,
    height : 80,

  },
  logopicWrap : {
    alignItems : 'center',
    justifyContent : 'center',
    borderColor : '#23b825',
    borderWidth : 2,
    borderRadius: 10,
    width : screenWidth - 60,
    height : 180,
    marginTop : 20,
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
  }    
});

