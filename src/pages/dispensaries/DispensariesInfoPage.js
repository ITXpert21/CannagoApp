
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import InfoContent from '../../components/dispensaries/profile/InfoContent';
import Tabs from '../../components/dispensaries/tab/Tabs';
import Icon from 'react-native-vector-icons/Feather';

export default class DispensariesInfoPage extends Component{
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
          
          <TouchableOpacity style={styles.backBtnView} onPress={() => this.props.navigation.goBack('')}>
            <Icon name="arrow-left"  size={30} color="white"/>
          </TouchableOpacity>        
        
        <View style={styles.pageTitle}>
          <Text style={{fontSize : 22}}>Profile Information</Text>
        </View>        

      </View>        
        <ScrollView >
          <InfoContent gotoProfilePage={() => this.props.navigation.navigate('ProfileDispensariesPage')}/>

        </ScrollView>
        <Tabs 
          gotoProductsPage={() => this.props.navigation.navigate('ProductsDispensariesPage')}
          gotoOrderHistoryPage={() => this.props.navigation.navigate('OrderHistoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfileDispensariesPage')}
          selectTab={this.state.selectTab}

          />        
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    alignItems : 'center',

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

