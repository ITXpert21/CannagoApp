import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { ListItem} from 'react-native-elements';

export default class Detail extends Component{


    constructor(props){
        super(props)
    }
/*
https://github.com/Monte9/react-native-ratings/issues/26        : please see for rating coding
*/

  render(){
    let rating = 3;
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let path = require('../assets/imgs/selectedStar.png');
        if (i > rating) {
          path = require('../assets/imgs/unselectedStar.png');
        }
        stars.push(<Image key={i} style={styles.ratingImage} source={path} />);
      }
    return (

        <View>
            <View style={{alignItems : 'center', marginTop : 20}}> 
                <Image style={styles.productimage} source={require('../assets/imgs/productdetail.png')} ></Image>
            </View>
            <View style={{alignItems : 'flex-start', justifyContent : 'center', paddingLeft : '10%', paddingRight : '10%'}}>
                <Text style={styles.producttext}>Name: Just CBD Gummies</Text>
                <Text style={styles.producttext}>Price: $ 24.99</Text>
                <View style={styles.ratingview}>
                    <Text style={styles.producttext}>Rating: </Text> 
                    <View style={{flexDirection: 'row', marginTop:20}}>
                        {stars}
                    </View>
                </View>
                <Text style={styles.producttext}>Description:</Text>
                <Text style={{fontSize : 12, color: '#9fa19f'}}>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic…. designs. The passage is attributed to an 
                :</Text>

           </View>
           <View style={{alignItems : 'center', justifyContent : 'center'}}>
               <TouchableOpacity onPress={this.props.gotoCartPage}>
                    <View style={styles.addcart}>
                        <Text style={styles.addcarttext}>Add to Cart</Text>
                    </View>
                </TouchableOpacity>           

           </View>
           <Text style={{fontSize : 20, marginLeft : '10%'}}>Reviews:</Text>

            <ListItem
                title='Naomi N.'
                subtitle={
                    <View style={styles.subtitleView}>
                        {stars}
                        <Text style={styles.ratingText}>5 months ago</Text>
                    </View>
                }
                containerStyle={styles.listitem}
                leftAvatar={{ source: require('../assets/imgs/avatar1.png') }}
                />
            <Text style={{fontSize : 14, marginLeft : 50}}>This is my third time try this oil. I loved it.</Text>

            <ListItem
                title='Mason G.'
                subtitle={
                    <View style={styles.subtitleView}>
                        {stars}
                        <Text style={styles.ratingText}>5 months ago</Text>
                    </View>
                }
                containerStyle={styles.listitem}
                leftAvatar={{ source: require('../assets/imgs/avatar2.png') }}
                />
            <Text style={{fontSize : 14, marginLeft : 50, marginRight : 20}}>New to the CBD scene. This was great oil to help relieve my pain.</Text>
        </View>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({

    subtitleView: {
        flexDirection: 'row',
        paddingTop: 5
      },
      ratingImage: {
        height: 20,
        width: 20
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey',
        textAlign: 'right'
      },
    productimage : {
        height : 200,
        width : 200,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },    
    producttext : {
        fontSize : 20,
        marginTop : 20
    },

    ratingview : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 5,
    },
    addcarttext : {
        color : 'white',
        fontSize : 22,
        fontWeight : '400'
    },
    addcart: {
        backgroundColor:'#23b825',
        width : screenWidth - 60,
        height: 50,
        borderRadius:20,
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: '#919090',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10, 
        marginTop : 30,
        marginBottom : 30
    },
    listitem : {
        marginLeft : '10%',
        backgroundColor : 'transparent'
    }
});
