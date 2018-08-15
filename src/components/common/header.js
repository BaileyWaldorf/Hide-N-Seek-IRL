import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headerTitle: 'Send' };
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={{color: "white", fontSize: "20", fontWeight: "bold"}}>{this.state.headerTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: .07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
    paddingTop: 20,
    paddingBottom: 5,
  }
});
