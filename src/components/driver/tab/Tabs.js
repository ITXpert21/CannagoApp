import React, {Component} from 'react';
import {
  StyleSheet,

  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export  default class Tabs extends Component{

  constructor(props){
    super(props);
  }   

  render(){
      const selectTab = this.props.selectTab;
      switch(selectTab){
        case 'product' :
            return (
                <View style={styles.tabview}>
                 {/* 37d613    */}
                  <TouchableOpacity style={styles.tabhomeview} onPress={this.props.openPopup}>
                    <Icon name="home"  size={20} color="#37d613" />
                    <Text style={{color : '#37d613'}}>  Home</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoOrderHistoryPage}>
                    <Icon name="shopping-basket"  size={20} color="#adb0ab" />
                  </TouchableOpacity>
          
          
                  <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoProfilePage}>
                    <Icon name="user"  size={20} color="#adb0ab" />
                  </TouchableOpacity>            
          
                </View>  
              );
        break; 
        case 'cart' :
            return (
                <View style={styles.tabview}>
                 {/* 37d613    */}
                  <TouchableOpacity style={styles.unselecttabhomeview} onPress={this.props.gotoProfilePage}>
                    <Icon name="home"  size={20} color="#adb0ab" />
                    <Text style={{color : '#adb0ab'}}>  Home</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.tabscommonview}>
                    <Icon name="shopping-basket"  size={20} color="#37d613" />
                  </TouchableOpacity>
          
          
                  <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoProfilePage}>
                    <Icon name="user"  size={20} color="#adb0ab" />
                  </TouchableOpacity>            
          
                </View>  
              );
        break;         
        case 'profile' :
            return (
                <View style={styles.tabview}>
                 {/* 37d613    */}
                  <TouchableOpacity style={styles.unselecttabhomeview} onPress={this.props.openPopup}>
                    <Icon name="home"  size={20} color="#adb0ab" />
                    <Text style={{color : '#adb0ab'}}>  Home</Text>
                  </TouchableOpacity>
                  
         
                  <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoDriverHistoryPage}>
                    <Icon name="shopping-basket"  size={20} color="#adb0ab" />
                  </TouchableOpacity>
          
          
                  <TouchableOpacity style={styles.tabscommonview} >
                    <Icon name="user"  size={20} color="#37d613" />
                  </TouchableOpacity>            
          
                </View>  
              );
        break;         

        case 'none' :
            return (
              <View style={styles.tabview}>
              {/* 37d613    */}
               <TouchableOpacity style={styles.unselecttabhomeview} onPress={this.props.gotoProfilePage}>
                 <Icon name="home"  size={20} color="#adb0ab" />
                 <Text style={{color : '#adb0ab'}}>  Home</Text>
               </TouchableOpacity>
               
               <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoDriverHistoryPage}>
                 <Icon name="shopping-basket"  size={20} color="#adb0ab" />
               </TouchableOpacity>
       
       
               <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoProfilePage}>
                 <Icon name="user"  size={20} color="#adb0ab" />
               </TouchableOpacity>            
       
             </View>  
              );
        break;   
                        
        default :
            return (
            
                <View style={styles.tabview}>
                    
                <TouchableOpacity style={styles.tabhomeview} onPress={this.props.gotoProductCategoryPage}>
                    <Icon name="home"  size={20} color="#37d613" />
                    <Text style={{color : '#37d613'}}>  Home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoSearchStorePage}>
                    <Icon name="search"  size={20} color="#adb0ab" />
                </TouchableOpacity>
        
        
                <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoAddNewCartPage}>
                    <Icon name="shopping-basket"  size={20} color="#adb0ab" />
                </TouchableOpacity>
        
        
                <TouchableOpacity style={styles.unselecttabscommonview} onPress={this.props.gotoProfilePage}>
                    <Icon name="user"  size={20} color="#adb0ab" />
                </TouchableOpacity>            
        
                </View>  
            );
        break;        


      }

  }
}
const styles = StyleSheet.create({
  tabview : {
    width : '100%',
    height : 80,
    borderWidth : 1,
    borderColor : '#a3a0a0',
    borderBottomColor : 'transparent',
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'white'
  },
  tabhomeview : {
    width : '33%',
    height : 50,
    backgroundColor : '#cef5b8',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 20,
  },
  unselecttabhomeview : {
    width : '33%',
    height : 50,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 20,
    marginLeft : 20,
  },  
  tabscommonview : {
    width : '33%',
    height : 50,
    backgroundColor : '#cef5b8',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 20,

  },  
  unselecttabscommonview : {
    width : '33%',
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    
  },    
});