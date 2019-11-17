import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const SignOutScreen = ( {navigation}) => {
    const {signout} = useContext(AuthContext);
   return<>
        <Spacer>
            <Text style={{fontSize: 48}}>Sign Out Screen</Text>
        </Spacer>
        
        <Spacer>
            <Button 
                title="Sign Out"
                onPress={signout} />
        </Spacer>
    </>
};

const styles = StyleSheet.create({});

export default SignOutScreen;