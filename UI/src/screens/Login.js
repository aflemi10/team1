import React, { Component} from 'react';
import { View , Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
export default class Splash extends Component{
    render() {
        return (
          <KeyboardAvoidingView behavior="padding" style={style.container}> 
           <View style={style.logoContainer}>
            <Image 
                style={style.logo}
                source={require('../components/images/basket.png')}/>
           </View>
           <View style={style.formContainer}>
            <LoginForm/>
           </View>
          </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95a5a6',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
       
    logo: {
            width: 200,
            height: 200,
    },
});
