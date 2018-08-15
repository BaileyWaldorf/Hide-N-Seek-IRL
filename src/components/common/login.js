import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="LOGIN" color="white" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="CONTINUE AS GUEST" color="white" />
        </View>
        <Button title="Not a member? Sign up!" color="steelblue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding:10,
    width: 300,
    height:60,
    overflow:'hidden',
    borderRadius:'100%',
    backgroundColor: 'steelblue',
    textAlignVertical: '',
    justifyContent: 'center',
    margin: 10,
  },
});
