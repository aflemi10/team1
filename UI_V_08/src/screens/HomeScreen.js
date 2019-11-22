
import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity, ScrollView, Button} from 'react-native';
import HomeDetail from '../components/HomeDetail';
{/*
import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
*/}
const HomeScreen = ({navigation}) => {
    return(
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Meal')}>
                <View style={styles.backgroundOne}>
                    <HomeDetail 
                         title="Meal Generator" 
                        imageSource={require('../../assets/meal.png')}
                    />
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Input')}>
                <View style={styles.backgroundTwo}>
                    <HomeDetail 
                        title="Grocery Input" 
                        imageSource={require('../../assets/input.png')}
                    />
                </View>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
                <View style={styles.backgroundThree}>
                    <HomeDetail 
                        title=" Grocery Inventory " 
                        imageSource={require('../../assets/inventory.png')}
                     />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Expiration')}>
                <View style={styles.backgroundFour}> 
                    <HomeDetail 
                        title=" Expiration View " 
                        imageSource={require('../../assets/expiration.png')}
                     />
                 </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Price')}>
                <View style={styles.backgroundFive}> 
                    <HomeDetail 
                        title=" Price Comparison " 
                        imageSource={require('../../assets/price.png')}
                    />
                 </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Weight')}>
                <View style={styles.backgroundSix}> 
                    <HomeDetail 
                        title="Weight Tracker" 
                        imageSource={require('../../assets/weight.png')}
                    />
                
                 </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Calorie')}>
                <View style={styles.backgroundSeven}> 
                <HomeDetail 
                        title="Calorie Tracker" 
                        imageSource={require('../../assets/calorie.png')}
                    />
                 </View>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignOut')}>
                <View style={styles.backgroundEight}> 
                <HomeDetail 
                        title="System Settings" 
                        //imageSource={require('../../assets/calorie.png')}
                    />
                 </View>
            </TouchableOpacity>  
                
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainBlock: {
        //height: 700,
    },
    backgroundOne: {
        backgroundColor: 'rgb(231,196,161)',
        height: 100,
    },
    backgroundTwo: {
        backgroundColor: 'rgb(230,115,202)',
        height: 100,
    },
    backgroundThree: {
        backgroundColor: 'rgb(232,221,86)',
        height: 100,
    },
    backgroundFour: {
        backgroundColor: 'rgb(230,115,109)',
        height: 100,
    },
    backgroundFive: {
        backgroundColor: 'rgb(231,182,107)',
        height: 100,
    },
    backgroundSix: {
        backgroundColor: 'rgb(77,229,231)',
        height: 100,
    },
    backgroundSeven: {
        backgroundColor: 'rgb(37,230,49)',
        height: 100,
    },
    backgroundEight: {
        backgroundColor: 'red',
        height: 100,
    },
    textStyle: {
        fontSize: 30,
    },
});

export default HomeScreen;