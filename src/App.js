import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '/components/Header';
import Login from './components/Login';
import Navigation from './components/Navigation';

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <Login />
        <Navigation />
      </View>
    );
  }
}
