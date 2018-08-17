import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './src/components/common/header';
// import Login from './src/components/common/login';
import Footer from './src/components/common/footer';
import Parking from './src/components/screens/parkingAvailability';

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <Parking />
        <Footer />
      </View>
    );
  }
}
