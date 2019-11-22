import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
//import {Text, Button, Input} from 'react-native-elements';
//import { Component} from 'react';
import {TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import Spacer from'./Spacer';

const AuthForm2 = ({headerText, errorMessage, onSumbit, submitText}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
          <TextInput 
          placeholder="username"
          placeholderTextColor="rgba(255,255,255,0.4)"
          returnKeyType="next"
          onSubmitEditing = {() => this.passwordInput.focus()}
          //keyboardType = "email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(newName) => setUsername(newName)}
          /> 
      
        <TextInput 
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input) => this.passwordInput = input}
            onChangeText={(newPassword) => setPassword(newPassword)}
          /> 
        
        <Spacer>
            {errorMessage? (<Text style={styles.errorMessage}>{errorMessage}</Text>):null}
        </Spacer>

            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => onSumbit({username, password})}>
                    <Text style={styles.buttonText}>{submitText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
    },
    container: {
        padding: 20,
      },
      input: {
          height: 40,
          backgroundColor: 'rgba(255,255,255,0.2)',
          marginBottom: 10,
          paddingHorizontal: 10,
          color: '#FFF',
      },
      buttonContainer: {
          backgroundColor: '#e74c3c',
          paddingVertical: 15,
      },
      buttonText :{
          textAlign: 'center',
          color: '#FFF',
          fontWeight: '700',
      }
});

export default AuthForm2;