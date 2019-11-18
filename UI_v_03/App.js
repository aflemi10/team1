import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//navigation imports
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//screen imports
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import MealScreen from './src/screens/MealScreen';
import InputScreen from './src/screens/InputScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import ExpirationScreen from './src/screens/ExpirationScreen';
import PriceScreen from './src/screens/PriceScreen';
import WeightScreen from './src/screens/WeightScreen';
import CalorieScreen from './src/screens/CalorieScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import LoadingScreen from './src/screens/LoadingScreen';
import SignOutScreen from './src/screens/SignOutScreen';
const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginProcess: createSwitchNavigator({
      SignUp: SignUpScreen,
      SignIn: SignInScreen,
      
  }),
  mainProcess: createStackNavigator({
    Home: HomeScreen,
    Meal: MealScreen,
    Input: InputScreen,
    Inventory: InventoryScreen,
    Expiration: ExpirationScreen,
    Price: PriceScreen,
    Weight: WeightScreen,
    Calorie: CalorieScreen,
    SignOut: SignOutScreen,
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return(
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </AuthProvider>
  );
};