
import React, {Component} from 'react';

import {
  StyleSheet, View, AsyncStorage, SafeAreaView,  ScrollView, Dimensions, Image, Text, TextInput, TouchableOpacity, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from '../../config/firebase'
import Toast from 'react-native-simple-toast';


export default class SigninPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      isLoading: false,
    };  
  }

  async _storeData(uid) {
    try {
      var userObj = {
        email : this.state.email,
        password : this.state.password,
        uid : uid 
      }
     await AsyncStorage.setItem('userInfo', JSON.stringify(userObj));
      //return jsonOfItem;

    } catch (error) {
      console.log(error.message);
    }
  }

   signin = async () =>  {



    if(this.state.email === '' && this.state.password === '') {
      Toast.showWithGravity('Enter email or password', Toast.LONG , Toast.TOP);
    } else {
      this.setState({isLoading: true});
      Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.setState({isLoading: false});
        this._storeData(res.user.uid);
        this.props.navigation.navigate('ProductCategoryPage')
      })
      .catch((error) => {
        this.setState({isLoading: false});
        Toast.showWithGravity(error.message, Toast.SHORT , Toast.TOP);
      })
    }
  }   
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollableView}>
          <View style={styles.header}>
            <View style={styles.logopicWrap}>
              <Image style={styles.logopic} source={require('../../assets/imgs/consumer_logo.jpg')} ></Image>
              <Text style={styles.logoname}>Cannago</Text>
              <Text style={styles.logouser}>for consumers</Text>
            </View>
          </View>  
          <View style={{alignItems : 'center'}}>
            <View style={styles.textinputview}> 
              <Icon name="envelope-o"  size={20} color="#37d613" style={styles.icon}/>
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
            <TouchableOpacity style={styles.forgottextview} onPress={this.props.gotoForgotPwdPage}>
              <Text style={styles.forgottext}>Forgot Password?</Text>
            </TouchableOpacity>
            {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }               
            <TouchableOpacity onPress={()=> this.signin()}>
              <View style={styles.signinBtn}>
                <Text style={styles.signiText}>Sign in</Text>
              </View>
            </TouchableOpacity>


            <View style={styles.signuptextView}> 
              <Text style={styles.signupText}>Don't have account</Text>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignupPage')}>
                <Text style={styles.signupBtnText}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity  onPress={()=> this.props.navigation.navigate('SigninDriverPage')}>
              <View style={styles.userSelectView}>
                <Text style={styles.userSelectText}>Want to driver with us?</Text>
              </View>
            </TouchableOpacity>          
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('SigninDispensariesPage')}>
              <View style={styles.userSelectView}>
                  <Text style={styles.userSelectText}>Want to sell with us?</Text>
              </View>
            </TouchableOpacity>       
          </View>            
        </ScrollView>
      </SafeAreaView>

    );
  }
}
const screenHeight = Math.round(Dimensions.get('window').height) ;
const screenWidth = Math.round(Dimensions.get('window').width) -60;

const styles = StyleSheet.create({
  container : {
      alignItems : 'center',
  },
  signuptextView : {
    alignItems : 'center',
    marginTop : 10,
  },    
  signupText : {
      fontSize : 14,
      fontWeight : 'bold' ,
      color : '#787777'
  },
  scrollableView : {
    height : screenHeight
  },
  header : {
    alignItems : 'center',
  },
  logopic: {
      width : 160,
      height : 150,
  },
  logopicWrap : {
      alignItems : 'center',
  },
  logoname : {
      fontSize : 43,
      fontWeight : 'bold' 
  },
  logouser : {
      fontSize : 18,
      color : '#61605f'
  }, 
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth,
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
      width : screenWidth,
      height: 60,
  },
  forgottextview : {
      flexDirection: 'row',
      justifyContent : 'flex-end',
      alignItems : 'center',
      color : '#61605f',
      marginBottom : 20,
      height: 50
  },
  forgottext : {
      color : '#61605f',
      width : 320,
      textAlign : 'right'
  },
  signinBtn: {
      backgroundColor:'#23b825',
      width : screenWidth,
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
  },
  signuptextView : {
      alignItems : 'center',
      marginTop : 10,
  },    
  signupText : {
      fontSize : 14,
      fontWeight : 'bold' ,
      color : '#787777'
  },
  signupBtnText : {
      fontSize : 14,
      fontWeight : 'bold' ,
      color : '#37d613'
  },
  userSelectView : {
      width : screenWidth ,
      height: 50,
      marginTop : 20,
      borderRadius:20,
      justifyContent : 'center',
      alignItems : 'center',
      borderColor : '#b3b0ad',
      borderWidth : 1
  },
  userSelectText : {
      color : '#61605f',
      fontSize : 16,
      fontWeight : '300'
  },   
});


