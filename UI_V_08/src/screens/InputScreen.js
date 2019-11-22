import React, {useState,useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';

const InputScreen = () => {
    const {inputGrocery} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [Quantity, setQuantity] = useState(0);
    const [Expiration, setExpiration] = useState(0);

    
    return (
        <View style={styles.viewStyle}>
        <View style={styles.block}>
            <View style={styles.subView}>
                <Text style={styles.type}>Name: </Text>
                <TextInput 
                    placeholder="Milk"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newName) => setName(newName)}
                />
            </View>

            <View style={styles.subView}>
            <Text style={styles.type}>Quantity: </Text>
            <TextInput 
                placeholder="3"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(newQuantity) => setQuantity(newQuantity)}
            />
            </View>

            <View style={styles.subView}>
            <Text style={styles.type}>Expiration: </Text>
            <TextInput 
                placeholder="10/10/22"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(newExpiration) => setExpiration(newExpiration)}
            />
            </View>
        </View> 
        <View style={styles.subButton}>
            <Button 
                title= "Add"
                onPress={() => inputGrocery({name, Quantity,Expiration})}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        //marginTop: 15,
        backgroundColor: 'rgb(255,255,255)',
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 15,
        borderRadius: 5,
    },
    type: {
        //marginTop: 15,
        fontSize: 22,
        fontWeight: 'bold',
    },

    subView:{
        margin: 10,
        flexDirection: 'row',

    },
    viewStyle: {
        backgroundColor: 'rgb(70,83,87)',
        flex: 1,
    },
    block: {
        margin: 20,
        backgroundColor: 'rgb(255,248,234)',
        borderRadius: 8,
    },
    subButton:{
        margin: 20,
        flex: 1,
    },
});

export default InputScreen;