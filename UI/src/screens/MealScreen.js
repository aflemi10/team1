import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import ResultsList from '../components/ResultsList';


const MealScreen = () => {
    // state used for budge variable
    const [amount, setAmount] = useState(0);
    // state used for the return from the yelp api
    const [results, setResults] = useState([]);
 
    // helper function to filter out content return from a get request 
    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };
   // error message state
    const [errorMessage, setErrorMessage] = useState('');
    // makes a network call from the api yelp.js
    // the /search string is concat to the root url
    const searchApi = async(searchAmount) => {
        try{
            const response = await yelp.get('/search',{
                params: {
                    limit: 20,
                    term: amount,
                    location: '4400 University Dr, Fairfax, VA 22030'
                }
            });
            //call useState functiona and save into array 
            setResults(response.data.businesses);
        }catch(err){
            setErrorMessage('Try again later');
        }
    };

    //default display when screen is first rendered
    useEffect(()=> {
        searchApi('pie');
    }, []);

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
            <ResultsList results={filterResultsByPrice('$')} title="Cost $"/>
            <ResultsList  results={filterResultsByPrice('$$')} title ="Cost $$"/>
            <ResultsList  results={filterResultsByPrice('$$$')} title="Cost $$$"/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({});
export default MealScreen;