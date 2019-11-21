import React, {useState, useContext} from 'react';
import {NavigationEvents} from 'react-navigation';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            /> 
            <AuthForm
                headerText="Sign In"
                errorMessage={state.errorMessage}
                onSumbit={signin}
                submitText="Sign In"
            />
            <NavLink
                routeName ="SignUp"
                text="Sign Up Screen"
            />
        </View>
    );
};

SignInScreen.navigationOptions =() =>{
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

export default SignInScreen;