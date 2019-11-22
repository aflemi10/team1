import React, {useState,useContext, useEffect,Component} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Button} from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import {LineChart} from "react-native-chart-kit";

const WeightScreen = () => {
    const {inputWeight} = useContext(AuthContext);
    const [weight, setWeight] = useState(0);
    const [result, setResults] = useState([]);
    
    
    //crashes if you run this
    //const data = result;

    //fixed data 
    const data= [145,134,200,142,198,200,176];



    async function getData() {
        //async () => {
            const baseURL= 'http://174.138.42.90:5000/get_user_full?';
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

            //console.log(json.user_profile.weight_data)
            return json.user_profile.weight_data;
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
        <View style={styles.subButton}>
            <Button 
                title= "Add"
                onPress={() => inputWeight({weight})}
            />
           
        </View>
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
                yAxisSuffix={"lb"}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
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

    subButton:{
        margin: 20,
        flex: 1,
    },
});

export default WeightScreen;