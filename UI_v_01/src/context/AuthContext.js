import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return {...state,errorMessage: action.payload}; 
        case 'signup':
            return{errorMessage: '', token: action.payload};
        default:
                return state;
    }

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
        const str = baseURL +"/login?"+usr+username+pas+ password;

        //used to dynamically create account
        //const str = baseURL +"/createaccount?"+usr+username+pas+ password+vali+password;

        //fetch('http://174.138.42.90:5000/login?username=new2&password=123456', {

        //use to login out
        //fetch('http://174.138.42.90:5000/logout?username=new2', {

        //comment out when loging out
      fetch(str , { 
            method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => {
            //AsyncStorage.setItem('token', response.useranme)
            console.log(response.username)})
            //dispatch({type: 'signup', payload: response.useranme})})
        .catch((error) => {
            console.log(str);
            console.log("Somethingwent wrong");
            dispatch({type: 'add_error', payload: 'Something went wrong'})
        })
    };
};
const signin = (dispatch) => {
    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';
    const pas='&password=';
    const vali = '&validationpassword=';

    return async ({username, password}) => {
        //make and api request

        //change state hold ID

        // fail catch
        const str = baseURL +"/login?"+usr+username+pas+ password;

        //fetch('http://174.138.42.90:5000/login?username=new2&password=123456', {
        //fetch('http://174.138.42.90:5000/logout?username=new2', {
   //   fetch('http://174.138.42.90:5000/login?username={$username}&password={$password}', {
     fetch(str , { 
            method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => 
            {console.log(response)})
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    };
};
const signout = (dispatch) => {
    const baseURL= 'http://174.138.42.90:5000';
    const usr=  'username=';

    return async ({username, password}) => {

        const str = baseURL +"/logout?"+usr+username;

        fetch(str , { 
            method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => 
            {console.log(response)})
        .catch((error) => {
        // console.log(str);
            console.log(error);
        })
    };
};
export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup},
    {token: null, errorMessage: ''}
);