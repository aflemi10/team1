import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import ResultsList from './ResultsList';

const ItemsDetail =({item}) =>{
    return <View>
        <Image style={styles.image} source={{ uri: item.image_url}}/>
        <Text style={styles.name}>
            {item.name}
        </Text>
        <Text>
            {item.rating} Stars, {ResultsList.review_count} Reviews
        </Text>
    </View>
};

const styles = StyleSheet.create({
    image: {
        width: 250,
        borderRadius: 4,
        height: 120,
    },
    name: {
        fontWeight: 'bold',
    }
});

export default ItemsDetail;