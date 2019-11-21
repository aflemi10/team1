import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
    return(
        <View>
            <Text>HomeScreen</Text>
            <Button 
                title="Go to Meal Generator"
                onPress={() => navigation.navigate('Meal')} />

            <Button 
                title="Go to Grocery Input"
                onPress={() => navigation.navigate('Input')} />

            <Button 
                title="Go to Grcery Inventory"
                onPress={() => navigation.navigate('Inventory')} />
                
            <Button 
                title="Go to Expiration"
                onPress={() => navigation.navigate('Expiration')} />

            <Button 
                title="Go to Price Comparison"
                onPress={() => navigation.navigate('Price')} />

            <Button 
                title="Go to Weight Tracker"
                onPress={() => navigation.navigate('Weight')} />

            <Button 
                title="Go to Calorie Tracker"
                onPress={() => navigation.navigate('Calorie')} />
            <Button 
                title="Sign out"
                onPress={() => navigation.navigate('SignOut')} />

        </View>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;