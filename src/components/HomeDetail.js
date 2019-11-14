import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const HomeDetail = ({imageSource, title,color}) =>{
    return (
        <View style={styles.background}>
            <Image style={styles.pictureBlock} source={imageSource}/>
            <Text style={styles.textStyle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flexDirection: 'row',
        margin: 25,
    },
    textStyle: {
        //borderColor: 'black',
        //borderWidth: 1,
        fontSize: 23,
        marginLeft: 35,
        flex: 1,
        marginTop: 5,
        //fontWeight: 'bold'
    },
    pictureBlock: {
        height: 50,
        width: 50,
    }
});

export default HomeDetail;