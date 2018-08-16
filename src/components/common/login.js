import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Login extends React.Component {
     handlePress = () => {};
     render() {
          return (
               <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                         <Button
                              onPress={this.handlePress}
                              title="LOGIN"
                              color="white"
                         />
                    </View>
                    <View style={styles.buttonContainer}>
                         <Button
                              onPress={this.handlePress}
                              title="CONTINUE AS GUEST"
                              color="white"
                         />
                    </View>
                    <Button
                         onPress={this.handlePress}
                         title="Not a member? Sign up!"
                         color="steelblue"
                    />
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
     },
     buttonContainer: {
          padding: 10,
          width: 300,
          height: 60,
          overflow: "hidden",
          borderRadius: 50,
          backgroundColor: "steelblue",
          justifyContent: "center",
          margin: 10
     }
});
