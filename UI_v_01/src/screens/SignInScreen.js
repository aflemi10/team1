import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Spacer from '../components/Spacer';

const SignInScreen = ( {navigation}) => {
    return<>
        <Spacer>
            <Text style={{fontSize: 48}}>SignInScreen</Text>
        </Spacer>
        <Spacer>
            <Button 
                title="Go to Sign Up Screen"
                onPress={() => navigation.navigate('SignUp')} />
        </Spacer>
        <Spacer>
            <Button 
                title="Go to Home Screen"
                onPress={() => navigation.navigate('Home')} />
        </Spacer>
    </>
};

const styles = StyleSheet.create({});

export default SignInScreen;