import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
//import ResultsList from './ResultsList';

const ItemsDetail_exp =({item}) =>{
    //console.log('expiration');
    //console.log(item.expiration);
    //const str = item.expiration.split('/'); //separates the date 
    //const num_str_month = parseInt(str[0]); //numerical version of the month
    //const num_str_day = parseInt(str[1]); //numerical version of the month
    //console.log('day?')
    //console.log(num_str);
    //const day = new Date().getDate(); //get current date
    //const month = new Date().getMonth(); //get current month
    //const num_day = parseInt(day); //numerical version of the string day
    //const num_month = parseInt(month); //numerical version of the string month
    //console.log('current month');
    //console.log(num_month);

    //calculate day difference
    const day = new Date().getDate(); 
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const date = year + '/' + month + '/' + day;
    const curr_date = new Date(date);
    const item_date = new Date(item.expiration);
    // console.log('curr_date');
    // console.log(curr_date);
    // console.log('item_date');
    // console.log(item_date);
    const time_diff = item_date.getTime() - curr_date.getTime();
    //const time_diff = curr_date.getTime() - item_date.getTime();
    const day_diff = time_diff / (1000 * 3600 * 24);
    // console.log('day_diff');
    // console.log(day_diff);
    //console.log()

    //if (day_diff <= 14 && day_diff >= 0){
    if (day_diff <= 14){
    return <View style = {styles.image}>
        <Text style={styles.name}>
            {item.name}
            
        </Text>
        <Text style={styles.date}>
            <Text>Expiration Date: </Text>{item.expiration}
        </Text>
    </View>
    }
    else{
        return <View><Text></Text></View>
    }
};


const styles = StyleSheet.create({
    image: {
        padding: 25,
        borderWidth: 20,
        backgroundColor: 'yellow',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    },
    date: {
        textAlign: 'center',
        fontSize: 25,
        height: 50,
    }
});

export default ItemsDetail_exp;