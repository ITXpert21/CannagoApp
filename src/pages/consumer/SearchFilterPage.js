
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

export default class SearchFilterPage extends Component{
  state = {
    selectTab: 'search'
  };    
  constructor(props){
    super(props);
    
} 
  render(){
    return (
      <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchStorePage')}>
        <View style={styles.backBtnView}>
          <Icon name="arrow-left"  size={30} color="white"/>
        </View>        
        </TouchableOpacity>          
        <ScrollView >
          <Text style={{marginLeft : 30, marginTop : 30,  fontSize : 20}}>Store Search Filters</Text>
          <Divider style={{ margin: 20, backgroundColor: '#616161' }} />
          <Text style={{marginLeft : 30, fontSize : 16}}>Best Rated</Text>
          <Text style={{marginLeft : 30, marginTop : 10, fontSize : 16}}>Alphabetical</Text>
          <Text style={{marginLeft : 30, marginTop : 10, fontSize : 16}}>Most Popular</Text>
          <Text style={{marginLeft : 30, marginTop : 10, fontSize : 16}}>Low to High</Text>
          <Text style={{marginLeft : 30, marginTop : 10, fontSize : 16}}>Lowest Estimated Delivery</Text>
          <Text style={{marginLeft : 30, marginTop : 10, fontSize : 16}}>Recommended</Text>
        </ScrollView>
        <TouchableOpacity>
          <View style={styles.addcart}>
              <Text style={styles.addcarttext}>Apply</Text>
          </View>
        </TouchableOpacity>      
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

  },
  addcarttext : {
    color : 'white',
    fontSize : 22,
    fontWeight : '400'
  },
  addcart: {
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
      margin : 30 
  } ,
  backBtnView : {
    width : '20%',
    height : 40,
    backgroundColor : '#23b825',
    marginTop : 20,
    alignItems : 'center',
    justifyContent : 'center'
}
 
});

