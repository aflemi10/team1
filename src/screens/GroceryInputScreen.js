import React,{useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ExpirationScreen from './ExpirationScreen';

const GroceryInputScreen = () => {
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

            <Text>{name}</Text>
            <Text>{Quantity}</Text>
            <Text>{Expiration}</Text>
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
});
export default GroceryInputScreen;