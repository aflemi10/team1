import React, {useState,useContext, useEffect,Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import {LineChart} from "react-native-chart-kit";




const CalorieScreen = () => {
    const {inputCalories} = useContext(AuthContext);
    const [calories, setCalories] = useState(0);
    const [result, setResults] = useState([]);
    
    
    //crashes if you run this
    //const data = result;

    //fixed data 
    const data= [12,32,32,42,43,43,34];



    async function getData() {
        //async () => {
            const baseURL= 'http://174.138.42.90:5000/nutritional/get_formatted_cal_data?';
            const usr=  'username=';
            const token =  await AsyncStorage.getItem('token');
            //const str = baseURL +"/nutritional/weight?"+usr+token;

            //temp patch
            //const str = baseURL +"/get_user_full?"+usr+token;
            const str = baseURL +usr+token;


            //console.log(str);
            const response = await fetch(str , { 
                method: 'GET',
            })
            const json = await response.json();
            //console.log('json below');
    
            //console.log(json)
            setResults(json)
            return json;
    }

    useEffect(() => {
        //if (results.length ==  {
        getData()
        .then((data) => {
            //console.log('whats in the box below?')
            console.log("good data being returned")
            console.log(data)
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
            
            <Text>Calories Chart</Text>
            <Text>fetch lenght size: {result.length}</Text>
            <LineChart
                data={{
                    labels: ["D-1", "D-2", "D-3", "D-4", "D-5", "D-6", "TODAY"],
                    datasets: [
                    {
                        data: data
                    }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel={""}
                yAxisSuffix={"c"}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
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