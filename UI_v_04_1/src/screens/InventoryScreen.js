import React,{useState, useEffect,useContext} from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import ResultsList from '../components/ResultsList';
import {AsyncStorage} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const InventoryScreen = () => {
    const {searchApi} = useContext(AuthContext);
    // state used for the return from the fetch 
    const [results, setResults] = useState([]);
 

   // error message state
    const [errorMessage, setErrorMessage] = useState('');

    // makes a network call from the api yelp.js
    // the /search string is concat to the root url


    //default display when screen is first rendered
    useEffect(()=> {
        (setResults(searchApi));
    }, []);

    return (
        <ScrollView>
           
            {errorMessage?<Text>{errorMessage}</Text> :null}
            <Text> 
                Found {results.length} results
            </Text>
            <ResultsList results={results}/>
         
        </ScrollView>
    )
};

export default InventoryScreen;