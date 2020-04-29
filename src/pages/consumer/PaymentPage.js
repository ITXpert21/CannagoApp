
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

import Tabs from '../../components/consumer/tab/Tabs';

export default class PaymentPage extends Component{
  state = {
    selectTab: 'profile'
  };    
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView >
            <View style={styles.paymentview}>
              <Text></Text>
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
  paymentview : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    width : '90%',
    height : 50
  }
});

