import React,{useState, useEffect, Component} from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text} from 'react-native';

export default class FetchScreen extends Component {
handlePress = async () => {
  fetch('http://174.138.42.90:5000/login?username=ten&password=123456', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //  "type": "select",
    "args": {
        username: "ten",
        password: "12345",
    }
      })
})
    .then((response) => response.json())
    .then((response) => 
        {console.log(response)})
    
    
    .catch((error) => {
      console.error(error);
    });
}
  render(){
  return(
   <View style={{paddingTop: 50, paddingLeft: 50 }}>
   <Text> Some other text </Text>
    <Text> Some other text </Text>
    <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
    </TouchableOpacity>
</View> 
  );
}
}
