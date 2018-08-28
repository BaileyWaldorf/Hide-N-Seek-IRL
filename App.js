import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigation from './src/components/navigation/home-stack-navigator';

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
          <Navigation />
      </View>
    );
  }
}
