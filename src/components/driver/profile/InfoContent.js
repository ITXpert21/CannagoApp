import React, {Component} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import CheckBox from 'react-native-check-box'

export default class InfoContent extends Component{

 
    constructor(props){
        super(props)
        this.state={
            textValue: 'Want to drive with us?'
        }
    }
 

  render(){
    return (
        <View>
            <View style={{alignItems : 'flex-start', marginTop : 20}}> 
                <Text style={{fontSize : 18}}> Driver Information</Text>
            </View>   
            <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
            <View style={styles.textinputview}> 
                <Icon name="envelope-o"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Larry@gmail.com"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="lock"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Update Password"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="(404)-123-786"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Update Driver License"/>
            </View>
            <View style={{alignItems : 'flex-start', marginTop : 20}}> 
                <Text style={{fontSize : 18}}> Vechicle Information</Text>
            </View>   
            <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Honda"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Civic"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Black"/>
            </View>
            <View style={styles.textinputview}> 
                <Icon name="user"  size={25} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="GFQ1FD"/>
            </View>

            <View style={{alignItems : 'flex-start', marginTop : 20}}> 
                <Text style={{fontSize : 18}}> Tax Information</Text>
            </View>   
            <Divider style={{ marginTop: 20, backgroundColor : 'black'}} />
            <View style={styles.textinputview}> 
                <Icon name="user"  size={20} color="#37d613" style={styles.icon}/>
                <TextInput style={styles.textinput} value="Update 1009 Agreement"/>
            </View>
            <TouchableOpacity onPress={this.props.gotoProfilePage}>
                <View style={styles.signinBtn}>
                    <Text style={styles.signiText}>Update</Text>
                </View>
            </TouchableOpacity>
            <View style={{height : 20}}>

            </View>
        </View>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
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
