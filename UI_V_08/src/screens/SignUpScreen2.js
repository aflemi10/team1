import React, {useState, useContext} from 'react';
import {NavigationEvents} from 'react-navigation';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm2 from '../components/AuthForm2';
import NavLink from '../components/NavLink';

const SignUpScreen2 = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            /> 
            <AuthForm2
                errorMessage={state.errorMessage}
                onSumbit={signin}
                submitText="Sign Up"
            />
            <NavLink
                routeName ="SignIn2"
                text="Sign In"
            />
        </View>
    );
};

SignInScreen.navigationOptions =() =>{
    return{
        header: null
    };
};

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


export default SignUpScreen2;