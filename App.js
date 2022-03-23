/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   StyleSheet,
 } from 'react-native';
import Navigate from './src/navigation/Navigate';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
 
 const App = () => {
   return(
     <Navigate/>
   );
 }
 
 const styles = StyleSheet.create({});
 
 export default App;
