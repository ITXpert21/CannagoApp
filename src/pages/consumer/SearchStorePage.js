
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Tabs from '../../components/consumer/tab/Tabs';
// import Category from '../../components/consumer/product/Category';

import { TextInput } from 'react-native-gesture-handler';

export default class SearchStorePage extends Component{
  state = {
    selectTab: 'search'
  };    
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView >
          <View style={styles.searchview}>
            <TextInput placeholder='Search' value={'  CBD Oil'} style={styles.searchInputText}/>
            <Icon name="plus"  size={20} color="#37d613" onPress={() => this.props.navigation.navigate('SearchFilterPage')}/>
          </View>
          <Text style={{marginLeft : 30, fontSize : 20}}>Result: 5 Stores</Text>
          {/* <Category /> */}

        </ScrollView>
        <Tabs 
          gotoAddNewCartPage={() => this.props.navigation.navigate('AddNewCartPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchPage={() => this.props.navigation.navigate('SearchStorePage')}

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

  searchview : {
    flexDirection : 'row',
    borderWidth : 1,
    width : '90%',
    height : 50,
    margin : 20,
    alignItems : 'center',
    justifyContent : 'center',
    borderColor : '#8e918e',
    borderRadius : 10
  },
  searchInputText : {
    width : '90%',
    height : 50

  }
});

