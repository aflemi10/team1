import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
//import ResultsList from './ResultsList';

const ItemsDetail =({item}) =>{
    return <View style = {styles.image}>
        <Text style={styles.name}>
            {item.name}
        </Text>
        <Text style={styles.quantity}>
            <Text>Quantity: </Text>{item.quantity}
        </Text>
    </View>
};

const styles = StyleSheet.create({
    image: {
        padding: 25,
        borderWidth: 20,
        backgroundColor: 'yellow',
    },
    name: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 40,
    },
    quantity: {
        textAlign: 'center',
        fontSize: 35,
        height: 50,
    }
});

export default ItemsDetail;