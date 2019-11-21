import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from'./Spacer';

const AuthForm = ({headerText, errorMessage, onSumbit, submitText}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <Spacer>
            <Text h3>{headerText}</Text>
        </Spacer>
        <Spacer>
            <Input 
                label="Username" 
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </Spacer>
        <Spacer>
            <Input 
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </Spacer>
        <Spacer>
            {errorMessage? (<Text style={styles.errorMessage}>{errorMessage}</Text>):null}

            <Button 
                title={submitText}
                onPress={() => onSumbit({username, password})}
            />
        </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
    },
});

export default AuthForm;