import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Spacer from '../components/Spacer';

const SignOutScreen = ( {navigation}) => {
    return<>
        <Spacer>
            <Text style={{fontSize: 48}}>Sign Out Screen</Text>
        </Spacer>
        
        <Spacer>
            <Button 
                title="Sign Out"
                onPress={() => navigation.navigate('')} />
        </Spacer>
    </>
};

const styles = StyleSheet.create({});

export default SignOutScreen;