import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Textarea from 'react-native-textarea';

const screenWidth = Math.round(Dimensions.get('window').width);
export default class Content extends Component{


    constructor(props){
        super(props)
        this.state = {
            popupVisible: false
          };  
              
    }
 

  render(){
    return (
        <View style={{alignItems : 'center'}}>
            <TouchableOpacity style={styles.textinputview} onPress={this.props.gotoProfileInfoPage}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 18}}>Profile Information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textinputview} onPress={this.props.gotoPaymentPage}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 18}}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textinputview} onPress={() => {this.setState({ popupVisible: true });}}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 18}}>Contact Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.gotoSigninPage} style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 18}}>Logout</Text>
            </TouchableOpacity>  
            <Dialog
              visible={this.state.popupVisible}
              footer={
                  <DialogFooter>
                    <DialogButton
                      text="Back"
                      onPress={() => {this.setState({ popupVisible: false });}}
                    />
                    <DialogButton
                      text="Send"
                      containerStyle={{backgroundColor : '#23b825'}}
                      onPress={() => {this.setState({ popupVisible: false });}}
                    />
                  </DialogFooter>
                }                        
                dialogStyle={{borderTopLeftRadius : 30, borderTopRightRadius : 30}}
                width={screenWidth}
                containerStyle={{ justifyContent: 'flex-end', borderRadius : 40}}

              height={300}
              dialogTitle={<Text style={{fontSize : 18, margin : 20}}>Message: </Text>}
              onTouchOutside={() => {
              this.setState({ popupVisible: false });
              }}
              >
              <DialogContent>
                  <Textarea
                      containerStyle={styles.textareaContainer}
                      // style={styles.textarea}
                      // onChangeText={this.onChange}
                      // defaultValue={this.state.text}
                      maxLength={200}
                      placeholder={' Type here...'}
                      placeholderTextColor={'#c7c7c7'}
                      underlineColorAndroid={'transparent'}
                      />  
              </DialogContent>
          </Dialog>                       
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
    signinBtn: {
        marginTop : 20,
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
    },
    textareaContainer : {
        borderWidth : 1,
        borderColor : '#dee0de',
        height : 150,
        backgroundColor: '#ededed',
    },
});
