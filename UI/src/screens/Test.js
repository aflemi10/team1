import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import ocean from '../api/ocean';

 

const Test = () => {
   
    // state used for budge variable
    const [amount, setAmount] = useState('');
    // state used for the return from the yelp api
    const [results, setResults] = useState([]);
 
   // error message state
    const [errorMessage, setErrorMessage] = useState('');
    // makes a network call from the api yelp.js
    // the /search string is concat to the root url
    const searchApi = async(searchAmount) => {
        try{
            const response = await ocean.post('',{
                    username: 'ten',
                    password: amount,
            });
            //call useState functiona and save into array 
            setResults(response);
        }catch(err){
           setErrorMessage('Try again later');
        }
    };

    //default display when screen is first rendered
    useEffect(()=> {
        searchApi(123456);
    }, []);

    {console.log(results)};
    
    return (
        <ScrollView>
            <SearchBar 
                amount={amount}
                onAmountChange={setAmount}
                onAmountSubmit={() => searchApi(amount)}
            />
            {errorMessage?<Text>{errorMessage}</Text> :null}
            <Text> 
                We have found {results.length} results
            </Text>
            
         
        </ScrollView>
    )
};

const styles = StyleSheet.create({});
export default Test;