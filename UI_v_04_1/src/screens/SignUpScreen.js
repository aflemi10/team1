import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents } from 'react-navigation';

const SignUpScreen = ({navigation}) => {
    const {state,signup,clearErrorMessage} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage}/>
        <AuthForm
            headerText="Sign Up"
            errorMessage={state.errorMessage}
            submitText="Sign Up"
            onSumbit={signup}
        />
        <NavLink
            routeName ="SignIn"
            text="Sign in Screen"
        />
        </View>
    );
};

SignUpScreen.navigationOptions =() =>{
    return{
        header: null
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

});

export default SignUpScreen;