import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const SignUpScreen = ({navigation}) => {
    const {state, signup} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.container}>
        <Spacer>
            <Text h3>Sign Up</Text>
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
            {state.errorMessage? (<Text style={styles.errorMessage}>{state.errorMessage}</Text>):null}

            <Button 
                title="Sign Up"
                onPress={() => signup({username, password})}
            />
        <Spacer/>
        {/*
            <Button 
                title="Go to Sign In page"
                onPress={() => navigation.navigate('SignIn')}
            />
        */}
        </Spacer>
       
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
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
    }
});

export default SignUpScreen;