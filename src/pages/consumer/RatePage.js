
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View
} from 'react-native';

import Rate from '../../components/consumer/rate/Rate';
import { ScrollView } from 'react-native-gesture-handler';

export default class RatePage extends Component{
  state = {
    selectTab: 'none'
  };  
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.container}>
          <Rate gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}/>
        </View>
        </ScrollView>
       
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1, 
    justifyContent : 'flex-end',
  },
});

