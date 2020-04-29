import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Textarea from 'react-native-textarea';

export default class Report extends Component {

    state = {
        popupVisible: false
      };
    constructor(props) {
        super(props)
    }
    /*
    https://github.com/Monte9/react-native-ratings/issues/26        : please see for rating coding
    */

    render() {
        let rating = 3;
        let stars = [];
        for (var i = 1; i <= 5; i++) {
            let path = require('../../../assets/imgs/star1.png');
            if (i > rating) {
                path = require('../../../assets/imgs/star2.png');
            }
            stars.push(<Image key={i} style={styles.ratingImage} source={path} />);
        }
        return (

            <View style={{ backgroundColor: 'white'}}>
                <Image style={{ marginTop: -5, width: screenWidth}} source={require('../../../assets/imgs/bladeborder.png')} ></Image>
                <View>
                    <ListItem
                        title='Just CBD Gummies'
                        subtitle={
                            <View>
                                <Text style={{ color: '#23b825', fontSize: 14, margin: 5 }}>$ 24.99</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {stars}
                                </View>
                            </View>
                        }
                        containerStyle={styles.listitem}
                        leftAvatar={
                            <View style={styles.productimageview}>
                                <Image style={styles.productimage} source={require('../../../assets/imgs/product3.png')} ></Image>
                            </View>
                        }
                    />
                    <Text style={{ fontSize: 18, marginLeft: '10%' }}>Review:</Text>
                    <TextInput style={styles.reviewtext} placeholder='Type here'></TextInput>
                    <View style={{ flexDirection: 'row', margin: '10%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {this.setState({ popupVisible: true });}}>
                            <Text style={{ fontSize: 18, color:'#23b825' }}>Report an issue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.reportBtn}>
                                <Text style={styles.reportBtnText}>Recorder</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 10, backgroundColor: '#a0a3a0' }} />
                </View>
                <View>
                    <ListItem
                        title='Just CBD Gummies'
                        subtitle={
                            <View>
                                <Text style={{ color: '#23b825', fontSize: 14, margin: 5 }}>$ 24.99</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {stars}
                                </View>
                            </View>
                        }
                        
                        containerStyle={styles.listitem}
                        leftAvatar={
                            <View style={styles.productimageview}>
                                <Image style={styles.productimage} source={require('../../../assets/imgs/product3.png')} ></Image>
                            </View>
                        }
                    />
                    <Text style={{ fontSize: 18, marginLeft: '10%' }}>Review:</Text>
                    <TextInput style={styles.reviewtext} placeholder='Type here'></TextInput>
                    <View style={{ flexDirection: 'row', margin: '10%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, color:'#23b825' }}>Report an issue</Text>
                        <TouchableOpacity>
                            <View style={styles.reportBtn}>
                                <Text style={styles.reportBtnText}>Recorder</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 10, backgroundColor: '#a0a3a0' }} />
                </View> 
                    <Dialog
                        visible={this.state.popupVisible}
                        footer={
                            <DialogFooter>
                              <DialogButton
                                text="Back"
                                onPress={() => {this.setState({ popupVisible: false });}}
                              />
                              <DialogButton
                                text="Send"
                                containerStyle={{backgroundColor : '#23b825'}}
                                onPress={() => {this.setState({ popupVisible: false });}}
                              />
                            </DialogFooter>
                          }                        
                          containerStyle={{ justifyContent: 'flex-end', borderRadius : 40}}
                          dialogStyle={{borderTopLeftRadius : 30, borderTopRightRadius : 30}}
                          width={screenWidth}
                          height={300}
                        dialogTitle={<Text style={{fontSize : 18, margin : 20}}>Message: </Text>}
                        onTouchOutside={() => {
                        this.setState({ popupVisible: false });
                        }}
                        >
                        <DialogContent>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                // style={styles.textarea}
                                // onChangeText={this.onChange}
                                // defaultValue={this.state.text}
                                maxLength={200}
                                placeholder={' Type here...'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                                />  
                       </DialogContent>
                    </Dialog>                      
            
            </View>
        );
    }
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    ratingview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingImage: {
        height: 20,
        width: 20
    },
    productimageview: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#23b825',
        alignItems: 'center',
        justifyContent: 'center'
    },
    productimage: {
        height: 90,
        width: 90

    },

    listitem: {
        backgroundColor: 'transparent',
        marginLeft: 10
    },
    reviewtext: {
        width: '80%',
        height: 50,
        backgroundColor: '#ededed',
        marginLeft: 30,
        marginTop: 10,
        borderRadius: 10,
        padding: 10
    },
    reportBtn: {
        backgroundColor: '#23b825',
        width: 120,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#919090',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10,
    },
    reportBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    dialogContentView : {
        width : '100%',
        height : 250

    },
    textareaContainer : {
        borderWidth : 1,
        borderColor : '#dee0de',
        height : 150,
        backgroundColor: '#ededed',
    },
});
