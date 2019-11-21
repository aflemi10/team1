import React, {useState,useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';


const WeightScreen = () => {
    const {inputWeight} = useContext(AuthContext);
    const [weight, setWeight] = useState(0);

    
    return (
        <View style={styles.viewStyle}>
        <View style={styles.block}>
            <View style={styles.subView}>
                <Text style={styles.type}>Weight: </Text>
                <TextInput 
                    placeholder="110"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newName) => setWeight(newName)}
                />
            </View>

        </View> 

            <Button 
                title= "Add"
                onPress={() => inputWeight({weight})}
            />
            <Text>{weight}</Text>
      
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

export default WeightScreen;