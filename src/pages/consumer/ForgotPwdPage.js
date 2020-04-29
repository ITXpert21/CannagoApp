
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { DialogContent } from 'react-native-popup-dialog';



export default class ForgotPwdPage extends Component{
  state = {
    popupVisible: false
  };  
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image style={styles.logopic} source={require('../../assets/imgs/shape.png')} ></Image>
          <Text style={{margin: 20, fontSize : 16}}>Please enter the email address you used to {"\n"} make your Cannago Account</Text>
          <View style={styles.textinputview}> 
              <Icon name="envelope-o"  size={20} color="#37d613" style={styles.icon}/>
              <TextInput style={styles.textinput} placeholder="Email Address"/>
          </View>    
          <TouchableOpacity onPress={() => {this.setState({ popupVisible: true });}}>
            <View style={styles.submitBtn}>
                <Text style={styles.submitText}>Submit</Text>
            </View>
          </TouchableOpacity> 
        </View>
        <Dialog
            visible={this.state.popupVisible}
            containerStyle={{ justifyContent: 'flex-end', borderRadius : 40}}
            width={340}
            height={340}
            onTouchOutside={() => {
              this.setState({ popupVisible: false });
              this.props.navigation.navigate('SigninPage')
            }}
            >
            <DialogContent>
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <Image style={{width : 150, height : 150, marginTop : 30}} source={require('../../assets/imgs/shape2.png')} ></Image>
              <Text style={{margin: 20, fontSize : 16}}>Please check your email inbox for further instructions!</Text>
            </View>
            </DialogContent>
        </Dialog>  
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
      alignItems : 'center',
      justifyContent : 'center',
      flex : 1
  },
  logopic: {
    width : 150,
    height : 150,
  }, 
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : 320,
    height: 50,
    marginTop : 30,
    marginBottom : 30,
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
submitBtn: {
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
submitText : {
  color : 'white',
  fontSize : 22,
  fontWeight : '400'
},
});

