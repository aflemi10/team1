import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const SignOutScreen = ( {navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {signout} = useContext(AuthContext);
   return<>
        <Spacer>
            <Text style={{fontSize: 48}}>Sign Out Screen</Text>
        </Spacer>
        
        <Spacer>
            <Button 
                title="Sign Out"
                onPress={() => signout({username,password})} />
        </Spacer>
    </>
};

const styles = StyleSheet.create({});

export default SignOutScreen;