import React,{useState, useEffect,useContext} from 'react';
import {FlatList, View, Text, StyleSheet,ScrollView} from 'react-native';
import ResultsList from '../components/ResultsList';
import {AsyncStorage} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const InventoryScreen = () => {
    //const {searchApi} = useContext(AuthContext);
    const {inventoryList} = useContext(AuthContext);
    // state used for the return from the fetch 
    const [results, setResults] = useState([]);
    //const [results, setResults] = useState(inventoryList);
    //console.log(inventoryList.itemName);
    const [counter, setCounter] = useState(0);//used to atempt to iterate

   // error message state
    const [errorMessage, setErrorMessage] = useState('');

    // makes a network call from the api yelp.js
    // the /search string is concat to the root url

    /*
    //default display when screen is first rendered
    useEffect(()=> {
        (setResults(searchApi));
    }, []);
    */
    
    //TESTING
    //const token = await AsyncStorage.getItem('token');
    

    async function getData() {
    //async () => {
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
        console.log(json)
        return json;
    }

    useEffect(() => {
        //if (results.length ==  {
        getData()
        .then((data) => {
            //console.log('whats in the box below?')
            //console.log(data)
            setResults(data)
        
        })
        //}//if end-bracket
        //console.log();
    }, []);

/*
    useEffect(()=> {
        let data = inventoryList
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            //setResults(response)
        })
        //(setResults(inventoryList));
        //setResults(inventoryList.map(item => {console.log(item.name)}))
    }, []);
*/    
    
    //const userItems = (dispatch) => {
    
    /*
    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';
    
    <FlatList
                data = {results}
    renderItem={({item}) => <Text style = {styles.item}>{item.itemName}</Text>}
            />
    
            {errorMessage?<Text>{errorMessage}</Text> :null}
            <Text> 
                Found {results.length} results
            </Text>
            
            <ResultsList results={results}/> 

            <ResultsList results={results}/> 
    */
    //componentDidMount()

   //render() {
    //console.log('start');
    //console.log(results);
    //console.log('stop');
    return (
            <ScrollView>
                {errorMessage?<Text>{errorMessage}</Text> :null}
            <Text> 
                Found {results.length} results
            </Text>
            
            <ResultsList results={results}/>
            </ScrollView>
    ) 
   //};
};
/*
const styles = StyleSheet.create({
    item: {
        //marginTop: 15,
        backgroundColor: 'rgb(255,255,255)',
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 15,
        borderRadius: 5,
    },
   });
*/
export default InventoryScreen;