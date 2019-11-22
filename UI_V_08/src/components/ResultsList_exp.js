import React from 'react';
import {View, Text, StyleSheet, FlatList, ListItem,} from 'react-native';
import ItemsDetail_exp from './ItemsDetail_exp';

const ResultsList_exp= ({results}) => {
    // day = new Date();
    // data={results}
    // console.log('data')
    // console.log(data)
    // item = ({item})
    // console.log('item')
    // console.log(item)

    //if ( Math.abs(item.expiration - (item.expiration)) )
    //if(item.expiration > day && (item.expiration - day) <= 14) {
        //
        return (
            <View>
               <FlatList
                data={results}
                keyExtractor={result=> result.name}
                renderItem={({item})=> {
                    return <ItemsDetail_exp item={item}/>;
                }}
               />
            </View>
        );
    // }
    // else{
    //     return(
    //     <View>
    //         <Text>Oops</Text>
    //     </View>
    //     );
    // }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }, 
});

export default ResultsList_exp;