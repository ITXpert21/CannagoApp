
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import InfoContent from '../../components/consumer/profile/InfoContent';
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
          <InfoContent gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}/>

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
  pageTitle : {
    width : '60%',
    height : 40,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 20,
  }

});

