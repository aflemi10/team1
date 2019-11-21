import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import SearchList from './SearchList';
const forImage = "img-link";
const SearchDetail = ({result}) => {
    return(

        <View >
            <Text style={styles.name}>{result.name}</Text>
            <Text style={styles.name}>{result.store}</Text>
            <Text style={styles.price}>{result.price}</Text>
            <Image style={styles.image} source={{uri: result["img-link"]}}/>
        
           
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        borderRadius: 4,
        height: 250,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    }
});

export default SearchDetail;