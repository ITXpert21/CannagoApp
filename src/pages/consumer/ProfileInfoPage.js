
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Tabs from '../../components/consumer/tab/Tabs';
import Icon from 'react-native-vector-icons/Feather';

export default class ProfileInfoPage extends Component{
  state = {
    selectTab: 'profile'
  };    
  constructor(props){
    super(props);
    
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
        <View style={{alignItems : 'center'}}>
          <View>
            <View style={styles.logopicWrap}>
              {/*<Image style={styles.logopic} source={require('../../../assets/imgs/photo.png')} ></Image>*/}
            </View>          
              <Text style={{color : '#a2a6a2', fontSize : 22, marginTop : 30}}>Welcome John H, 25</Text>
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
        </ScrollView>
        <Tabs 
          gotoAddNewCartPage={() => this.props.navigation.navigate('AddNewCartPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchStorePage={() => this.props.navigation.navigate('SearchStorePage')}

          selectTab={this.state.selectTab}
          />        
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

