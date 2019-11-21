import React, {useState,useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';
import SearchList from '../components/SearchList';

const PriceScreen = () => {
    const [item, setItem] = useState('');
    const [zip, setZip] = useState('');
    // state used for the return from the fetch 
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    


    async function getData({item,zip}) {
        //async () => {
            try{
            const baseURL= 'http://174.138.42.90:5000/pricecompare?';
            const idItem=  'item_name=';
            const zc=  '&zipcode=';
         
            const str = baseURL +idItem+ item + zc + zip;
            //console.log(str);
            const response = await fetch(str , { 
                method: 'GET',
            })
            const json = await response.json();
            //console.log('json below');
            setResults(json)
            console.log(json)
            return json;
            }catch(err){
                setErrorMessage('Error search for item');
            }
    }

    return (
      
        <View style={styles.viewStyle}>
        <View style={styles.block}>
            <View style={styles.subView}>
                <Text style={styles.type}>Item Name: </Text>
                <TextInput 
                    placeholder="Milk"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newName) => setItem(newName)}
                />
            </View>

            <View style={styles.subView}>
            <Text style={styles.type}>Zip Code: </Text>
            <TextInput 
                placeholder="3"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(newQuantity) => setZip(newQuantity)}
            />
            </View>
            
        </View> 
    
        <View style={styles.subButton}>
            <Button 
                title= "Search Best Deals"
                onPress={() => getData({item, zip,})}
            />
            {errorMessage? <Text>errorMessage</Text> : null}
            <Text> Number of items found : {results.length}</Text>

            <SearchList
                title={item}
                results={results}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin: 8,
        flex: 1,
    },
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
    subButton:{
        margin: 20,
        flex: 1,
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
export default PriceScreen;