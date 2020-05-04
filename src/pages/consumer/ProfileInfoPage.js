
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  AsyncStorage,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Firebase from '../../config/firebase';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
export default class ProfileInfoPage extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      isLoading : false,
      isUpdating : false,
      currentPassword : '',
      newPassword : '',
      photo: {},
      photoUri: '',

    }; 
  } 

  UNSAFE_componentWillMount(){
    this.setState({isLoading : true});

    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState(JSON.parse(userinfo));
      this.setState({userInfo : JSON.parse(userinfo)});
      this.setState({isLoading : false});

    });
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
            photoUri: response.uri,
            photo_url : response.uri
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
  
  
  updateProfile = async()  => {
    var  user = Firebase.auth().currentUser;
    if(this.state.phonenumber == ''){
      Toast.showWithGravity('Please insert phone number.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.email == ''){
      Toast.showWithGravity('Please insert email.', Toast.SHORT , Toast.TOP);
      return;
    }
    if(this.state.currentPassword == ''){
      Toast.showWithGravity('Please insert old password.', Toast.SHORT , Toast.TOP);
      return;
    }   
    if(this.state.newPassword == ''){
      Toast.showWithGravity('Please insert new password.', Toast.SHORT , Toast.TOP);
      return;
    }   
    this.setState({isUpdating: true });
    await user.updateEmail(this.state.email);

    Firebase.auth().signInWithEmailAndPassword(user.email, this.state.currentPassword)
    .then((res) => {
      this.state.userInfo.phonenumber = this.state.phonenumber;
      this.state.userInfo.email = this.state.email;

      user.updatePassword(this.state.currentPassword).then(() => {
        if(this.state.photoUri == ''){
          userService.updateConsumerProfile(this.state.userInfo).then(response =>{
            this.setState({isUpdating: false, });
            this.props.navigation.navigate('ProfilePage')
          });   
        }else{
          this.uploadImage(res.user.uid, this.state.photoUri)
          .then(url => { 
            this.state.userInfo.photo_url = url;
            userService.updateConsumerProfile(this.state.userInfo).then(response =>{
              this.setState({isUpdating: false, });
              this.props.navigation.navigate('ProfilePage')
            });   
          }).catch(error => console.log(error));
        }  
      });

    }).catch((error) => {
        console.log("reauthenticate ===", error);
    });
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
    
        <View style={{flexDirection : 'row', width : '100%', height : 50, marginBottom : 30}}>
          
          <TouchableOpacity style={styles.backBtnView} onPress={() => this.props.navigation.navigate('ProfilePage')}>
            <Icon name="arrow-left"  size={30} color="white"/>
          </TouchableOpacity>        
        
        <View style={styles.pageTitle}>
          <Text style={{fontSize : 22}}>Profile Information</Text>
        </View>        

      </View>        
        <ScrollView >
        {this.state.isLoading &&
          <View style={styles.logopicWrap}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        }          
        <View style={{alignItems : 'center', justifyContent : 'center'}}>
          <TouchableOpacity style={{alignItems : 'center', justifyContent : 'center'}} onPress={() => this.chooseFile()} >
          {!this.state.isLoading &&
            <View style={styles.logopicWrap}>
            {this.state.photo_url == undefined ?
              <Image style={styles.camera} source={require('../../assets/imgs/camera.png')} ></Image> :
              <Image style={styles.logopic} source={{ uri: this.state.photo_url }} ></Image>
            }          
            </View>
            }     
              <Text style={{color : '#a2a6a2', fontSize : 22, marginTop : 30}}>Welcome {this.state.first_name}</Text>
          </TouchableOpacity>


          <View style={styles.textinputview}> 
            <Icon name="phone"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Mobile number" value={this.state.phonenumber}
                onChangeText={ phonenumber=> this.setState({phonenumber})} 
            />          
          </View>

          <View style={styles.textinputview}> 
            <Icon name="mail"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Email Address" value={this.state.email}
                onChangeText={ email=> this.setState({email})}  
            />
          </View>
          <View style={styles.textinputview}> 
            <Icon name="unlock"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="Current Password"
              onChangeText={ currentPassword=> this.setState({currentPassword})}
            />          
          </View>
          <View style={styles.textinputview}> 
            <Icon name="lock"  size={25} color="#37d613" style={styles.icon}/>
            <TextInput style={styles.textinput} placeholder="New Password" 
              onChangeText={ newPassword=> this.setState({newPassword})}  
            />          
          </View>          
          
          <TouchableOpacity style={styles.textinputview}> 
              <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
              <Text style={{color : '#a2a6a2', fontSize : 16}}>Deactive account</Text>
          </TouchableOpacity>    
          {this.state.isUpdating &&
            <View style={styles.logopicWrap}>
              <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
          } 
          <TouchableOpacity onPress={() => this.updateProfile()}>
            <View style={styles.updateBtn}>
              <Text style={styles.btnText}>Update Profile Info</Text>
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
    width : '20%',
    height : 40,
    backgroundColor : '#23b825',
    marginTop : 20,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row'
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
      marginTop : 20,
      marginBottom : 10
  },  
  pageTitle : {
    width : '60%',
    height : 40,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 20,
  },
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
    height: 50,
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
  updateBtn: {
      marginTop : 30,
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
  btnText : {
      color : 'white',
      fontSize : 22,
      fontWeight : '400'
  }

});

