import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MatchList from './components/match-list';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Detail from './components/detail'
import Auth from './components/auth';
import Availability from './components/availability'

const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  MatchList: {screen: MatchList},
  Detail: {screen: Detail},
  Availability: {screen: Availability}
});


const App = createAppContainer(AppNavigator);


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
