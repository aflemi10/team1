//import React from 'react';
import React,{useState, useEffect,useContext} from 'react';
import ResultsList_exp from '../components/ResultsList_exp';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';

const ExpirationScreen = () => {
    //store array and use to display
    const [results, setResults] = useState([]);

    async function getData() {
            const baseURL= 'http://174.138.42.90:5000';
            const usr=  'username=';
            const token =  await AsyncStorage.getItem('token');
            const str = baseURL +"/items/get?"+usr+token;
            console.log('mah str');
            console.log(str);
            const response = await fetch(str , { 
                method: 'GET',
            })
            const json = await response.json();
            //console.log('json below');
            //console.log(json)
            return json;
    }
    
    useEffect(() => {
        getData()
        .then((data) => {
            console.log('whats in the box below?')
            console.log(data)
            setResults(data)
        })
        .catch((error) => {
            //console.log(str);
            console.log("Somethingwent wrong");
            //dispatch({type: 'add_error', payload: 'Something went wrong'})
        })
    }, []);

    return(
        <ScrollView>
        <Text>ExpirationScreen</Text>

        <ResultsList_exp results={results}/>
        </ScrollView>
    )
};

//const styles = StyleSheet.create({});

export default ExpirationScreen;