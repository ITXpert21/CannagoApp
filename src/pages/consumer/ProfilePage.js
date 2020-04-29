
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import Header from '../../components/consumer/profile/Header';
import Content from '../../components/consumer/profile/Content';
import Tabs from '../../components/consumer/tab/Tabs';

export default class ProfilePage extends Component{
  state = {
    selectTab: 'profile'
  };    
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header/>
          <Content 
            gotoProfileInfoPage={() => this.props.navigation.navigate('ProfileInfoPage')}
            gotoSigninPage={() => this.props.navigation.navigate('SigninPage')}            
            gotoPaymentPage={() => this.props.navigation.navigate('PaymentPage')}
            />
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
    alignItems : 'center'
   }
});

