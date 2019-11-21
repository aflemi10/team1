import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchDetails from './SearchDetails';

const SearchList = ({title,results}) => {
    return(
        <View>
            <Text style={styles.title}>{title}</Text>
                <FlatList
                    data={results}
                    keyExtractor={result => result.name}
                    renderItem={({item}) => {
                        return <SearchDetails result={item}/>;
                    }}
                />
        </View>
    );

};
const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default SearchList;