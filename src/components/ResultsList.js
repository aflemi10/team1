import React from 'react';
import {View, Text, StyleSheet, FlatList,} from 'react-native';
import ItemsDetail from './ItemsDetail';

const ResultsList= ({title, results}) => {
return (
    <View>
        <Text style={styles.title}>{title}</Text>
       <FlatList
        data={results}
        keyExtractor={result=> result.id}
        renderItem={({item})=> {
            return <ItemsDetail item={item}/>;
        }}
       />
    </View>
);
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }, 
});

export default ResultsList;