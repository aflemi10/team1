import React, {useState,useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';
import {AsyncStorage} from 'react-native';

const CalorieScreen = () => {
    const {inputCalories} = useContext(AuthContext);
    const [calories, setCalories] = useState(0);
    const [results, setResults] = useState([]);
    
    const [errorMessage, setErrorMessage] = useState('');

    async function getData() {
        //async () => {
            const baseURL= 'http://174.138.42.90:5000';
            const usr=  'username=';
            const token =  await AsyncStorage.getItem('token');
            //const str = baseURL +"/nutritional/weight?"+usr+token;

            //temp patch
            const str = baseURL +"/get_user_full?"+usr+token;


            //console.log(str);
            const response = await fetch(str , { 
                method: 'GET',
            })
            const json = await response.json();
            //console.log('json below');
            console.log(json.user_profile.cal_data)
            return json.user_profile.cal_data;
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
    return (
        <View style={styles.viewStyle}>
        <View style={styles.block}>
            <View style={styles.subView}>
                <Text style={styles.type}>Calories: </Text>
                <TextInput 
                    placeholder="200"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newName) => setCalories(newName)}
                />
            </View>

        </View> 

            <Button 
                title= "Add"
                onPress={() => inputCalories({calories})}
            />
            <Text>{calories}</Text>

            <ScrollView>
                {errorMessage?<Text>{errorMessage}</Text> :null}
            <Text> 
                Found {results.length} results
            </Text>
            {/* 
            <ResultsList results={results}/>
            */}
            </ScrollView>
      
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

export default CalorieScreen;