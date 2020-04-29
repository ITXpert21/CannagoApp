import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class InfoContent extends Component{

 
    constructor(props){
        super(props)
        this.state={
            textValue: 'Want to drive with us?'
        }
    }
 

  render(){
    return (
        <View style={{alignItems : 'center'}}>
            <View>
                <Text style={{color : '#a2a6a2', fontSize : 20, marginTop : 30}}>Welcome John H, 25</Text>
            </View>
            <TouchableOpacity style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 16}}>Phone Number 768 7821 1232</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 16}}>Email: JohnH@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 16}}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 16}}>UpdateID</Text>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <Text style={{color : '#a2a6a2', fontSize : 16}}>Deactive account</Text>
            </TouchableOpacity>            

        </View>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);

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
    }
});
