import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return {...state,errorMessage: action.payload}; 
        case 'signin':
            return{errorMessage: '', token: action.payload};
        case 'clear_error_message':
                return {...state, errorMessage: action.payload};
        case 'signout':
            return {token: null, errorMessage: ''}
        default:
                return state;
    }

};

const tryLocalSignin = dispatch => async() =>{
    const token = await AsyncStorage.getItem('token');
    console.log("Below is the first token check");
    console.log(token);
    console.log("saving token into string result");
    const name = token;
    console.log(name);
    console.log("name variable");
    if(token){
        dispatch({type: 'signin', payload: token});
        navigate('Home');
    }
    else{
        navigate('SignUp');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message', payload: ''});  
};

const signup = (dispatch) => {
    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';
    const pas='&password=';
    const vali = '&validation-password=';

    return async ({username, password}) => {
        //make and api request

        //change state hold ID

        // fail catch

        //login screen
        //const str = baseURL +"/login?"+usr+username+pas+ password;

        //create screen
        const str = baseURL +"/createaccount?"+usr+username+pas+ password;

        //fetch('http://174.138.42.90:5000/login?username=new2&password=123456', {

        //use to login out
       //fetch('http://174.138.42.90:5000/logout?username=new2', {

        //comment out when loging out
      fetch(str , { 
            method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => {
            //AsyncStorage.setItem('token', response.username)
            console.log(response.username)
            //dispatch({type: 'signin', payload: response.username})
            navigate('SignIn')
            console.log(response)
        })
        .catch((error) => {
            //console.log(str);
            console.log("Somethingwent wrong");
            dispatch({type: 'add_error', payload: 'Something went wrong'})
        })
    };
};
const signin = (dispatch) => {

    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';
    const pas='&password=';

    return async ({username, password}) => {
       
        const str = baseURL +"/login?"+usr+username+pas+ password;

        //use to login out
       //fetch('http://174.138.42.90:5000/logout?username=new2', {

        //comment out when loging out
      fetch(str , { 
            method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => {
            AsyncStorage.setItem('token', response.username)
            console.log('First')
            console.log(response.username)

            console.log('Should be the same as first')
            const name =  AsyncStorage.getItem('token')
            console.log(name)

            dispatch({type: 'signin', payload: response.username})
            navigate('Home')
            console.log('Second')
            console.log(response)
        })
        .catch((error) => {
            console.log(str);
            console.log("Somethingwent wrong");
            dispatch({type: 'add_error', payload: 'Something went wrong'})
        })
    };
};
const signout = (dispatch) => {
    
    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';
    
    return async ({username, password}) => {
        const token =  await AsyncStorage.getItem('token');
        const str = baseURL +"/logout?"+usr+ token;

        console.log("check if not grabage");
        console.log(username);
        console.log(password);

        fetch(str , { 
            method: 'POST',
        })
        .then((response) => {
            console.log(response)
            AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})
            navigate('SignIn')
        })
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    };
};

const inputGrocery = (dispatch) => {
    
    const baseURL= 'http://174.138.42.90:5000/items/add?';
    // parameter names will be below
    {/*
    const usr=  'username=';
    const usr=  '&username=';
    const usr=  '&username=';
    */}
    
    return async ({name, Quantity, Expiration}) => {
        const token =  await AsyncStorage.getItem('token');
        const str = baseURL +"/logout?"+usr+ token;
        console.log(name,Quantity,Expiration);
        // below is the network request the below code needs to be mod. with the correct root and params 
        {/*
        fetch(str , { 
            method: 'POST',
        })
        .then((response) => {
            console.log(response)
            AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})
            navigate('SignIn')
        })
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    */}
    };
};
const inputWeight = (dispatch) => {
    
    const baseURL= 'http://174.138.42.90:5000/nutrition/weight?';
    // parameter names

    const usr=  'username=';
    const swo=  '&single_weight_object=';

    
    return async ({weight}) => {
        const token =  await AsyncStorage.getItem('token');
        const str = baseURL+usr+ token+swo+  weight;
        console.log(weight);
        // below is the network request the below code needs to be mod. with the correct root and params 
        {/*
        fetch(str , { 
            method: 'POST',
        })
        .then((response) => {
            console.log(response)
            AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})
            navigate('SignIn')
        })
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    */}
    };
};

const inputCalories = (dispatch) => {
    
    const baseURL= 'http://174.138.42.90:5000/nutrition/calories?';
    // parameter names

    const usr=  'username=';
    const cal=  '&calories=';
 
    
    return async ({calories}) => {
        const token =  await AsyncStorage.getItem('token');
        const str = baseURL +usr+ token + cal + calories;
        console.log(calories);
        // below is the network request the below code needs to be mod. with the correct root and params 
        {/*
        fetch(str , { 
            method: 'POST',
        })
        .then((response) => {
            console.log(response)
            AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})
            navigate('SignIn')
        })
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    */}
    };
};
export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin, inputGrocery,inputWeight,inputCalories},
    {token: null, errorMessage: ''}
);