
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import InfoContent from '../../components/driver/profile/InfoContent';
import Tabs from '../../components/driver/tab/Tabs';
import Icon from 'react-native-vector-icons/Feather';

export default class DriverInfoPage extends Component{
  state = {
    selectTab: 'none'
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
          <Text style={{fontSize : 22}}>Driver Information</Text>
        </View>        

      </View>        
        <ScrollView >
          <InfoContent gotoProfilePage={() => this.props.navigation.navigate('ProfileDriverPage')}/>

        </ScrollView>
        <Tabs 
          gotoProfilePage={() => {this.props.navigation.navigate('ProfileDriverPage')}}
          gotoDriverHistoryPage={() => this.props.navigation.navigate('DriverHistoryPage')}
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

