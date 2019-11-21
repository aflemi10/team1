import React from 'react';
//import React,{useState, useEffect,useContext} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';

const ExpirationScreen = () => {
    //store array and use to display
    const [resulsts, setResults] = useState([]);

    async function getData() {
            const baseURL= 'http://174.138.42.90:5000';
            const usr=  'username=';
            const token =  await AsyncStorage.getItem('token');
            const str = baseURL +"/items/get?"+usr+token;
            //console.log(str);
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
                //console.log('whats in the box below?')
                //console.log(data)
                setResults(data)
            })
        }, []);

    return(
        <Text>ExpirationScreen</Text>
    );
};

const styles = StyleSheet.create({});

export default ExpirationScreen;