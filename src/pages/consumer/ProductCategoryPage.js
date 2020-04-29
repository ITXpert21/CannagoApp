
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  View
} from 'react-native';
import { SearchBar} from 'react-native-elements';
import Tabs from '../../components/consumer/tab/Tabs';
import storeService from '../../services/storeService';

export  default class ProductCategoryPage extends Component{
 
  constructor(props){
    super(props);
    this.state = {
      selectTab: 'home',
      isLoading : false,
      isEmptyStore : true
    }; 
  }  

  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('userInfo').then((userinfo)=>{
      this.setState({uid : JSON.parse(userinfo).uid})
    });
    this.getStores();
  }

  getStores = () =>{
    this.setState({isLoading : true});
    storeService.getStores(this.state.uid).then(result =>{
 
      var storelist = [];
      result.forEach(function(store){
        storelist.push(store.val());
      });
      if(storelist.length > 0)
        this.setState({isEmptyStore : false});
      else  
        this.setState({isEmptyStore : true});

        this.setState({storelist : storelist});
       this.setState({isLoading : false});
    });  
  }
  updateSearch = search => {
    this.setState({ search });
  };

  viewProductList = (dispensary) => {
    let navParam = {
      dispensary : dispensary
    };
    this.props.navigation.navigate('ProductsPage', { navParam });
  }  
  render(){
    let rating = 3;
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let path = require('../../assets/imgs/star1.png');
        if (i > rating) {
          path = require('../../assets/imgs/star2.png');
        }
        stars.push(<Image key={i} style={styles.ratingImage} source={path} />);
      }      
    return (
      <SafeAreaView style={styles.container}>
          <SearchBar
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={styles.searchcontainer}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
        <ScrollView>
          {this.state.isLoading &&
              <ActivityIndicator size="large" color="#9E9E9E"/>
            }
          <View style={styles.container}>
          {!this.state.isEmptyStore &&            
            <FlatList
            data={this.state.storelist}
            renderItem={({ item }) => (
              
              <TouchableOpacity onPress={()=> this.viewProductList(item)}>
              <View style={{alignItems : 'center', marginTop : 20}}> 
                <Text style={styles.stationtext}>{item.dispensary_info.storename}</Text>
                {item.photo_url != '' ? 
                  <Image source = {{ uri: item.photo_url }} style={styles.stationimage}></Image> :
                  null}
                           
                <View style={styles.stationfooter}>
                  <Text style={styles.stationfootertext}> Store's pricing: $$</Text>
                  <Text style={styles.stationfootertext}>Store's hour today: 9:am - 9:pm</Text>
                  <Text style={styles.stationfootertext}>Estimate Delivery ; 40 min</Text>
                  <View style={styles.ratingview}>
                      {stars}
                      <Text style={{color : 'white', fontSize : 14}}>  , 17 Reviews</Text>                      
                  </View>
                </View>
              </View>
            </TouchableOpacity>          
            )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          />






          }
          </View>
        </ScrollView>
        <Tabs 
          gotoAddNewCartPage={() => this.props.navigation.navigate('CartPage')}
          gotoProductCategoryPage={() => this.props.navigation.navigate('ProductCategoryPage')}
          gotoProfilePage={() => this.props.navigation.navigate('ProfilePage')}
          gotoSearchStorePage={() => this.props.navigation.navigate('SearchStorePage')}

          selectTab={this.state.selectTab}
          />
      </SafeAreaView>
     

    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width) -60;

const styles = StyleSheet.create({
  container : {
   flex : 1, 
   justifyContent : 'flex-end',
  },
  searchcontainer: {
    backgroundColor: 'white',
    borderWidth: 1, //no effect
    shadowColor: 'white', //no effect
    margin : 20,
    
    borderRadius : 10,
   },
   stationtext : {
    color : 'black',
    fontSize : 22,
    fontWeight : '400',
    marginBottom : 10
  },
  stationimage : {
      height : 150,
      width : screenWidth,
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10
  },    
  stationfooter : {
      alignItems : 'center',
      backgroundColor : '#43d162',
      height : 100,
      width : screenWidth,
      borderBottomLeftRadius : 10,
      borderBottomRightRadius : 10
  },
  ratingview : {
      marginTop : 5,
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : 'center'
  },
  stationfootertext : {
      marginTop : 5,
      color : 'white',
      fontSize : 14
  },
  ratingImage: {
      height: 15,
      width: 15,
      margin : 5
  },       
});

