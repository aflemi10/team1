import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Foundation} from '@expo/vector-icons';


const SearchBar = ({amount, onAmountChange, onAmountSubmit}) =>{
    return (
        <View style={styles.backgroundStyle}>
            <Foundation name="dollar" style={styles.iconStyles}/>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="seaches food"
                value={amount}
                onChangeText={onAmountChange}
                onEndEditing={onAmountSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        border: 5,
        margin: 15,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
    },
    iconStyles: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
});

export default SearchBar;