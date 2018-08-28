import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Footer extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               headerTitle: "Send"
          };
     }

     handlePress = () => {

     };

     render() {
          return (
               <View style={styles.navContainer}>
                    <View style={styles.icon}>
                         <Button
                              style={{
                                   color: "white",
                                   fontSize: 50,
                                   fontWeight: "bold"
                              }}
                              onPress={this.handlePress}
                              title="Send"
                              color="white"
                         />
                    </View>
                    <View style={styles.icon}>
                         <Text
                              style={{
                                   color: "white",
                                   fontSize: 15,
                                   fontWeight: "bold"
                              }}
                         >
                              Recieve
                         </Text>
                    </View>
                    <View style={styles.icon}>
                         <Text
                              style={{
                                   color: "white",
                                   fontSize: 15,
                                   fontWeight: "bold"
                              }}
                         >
                              More
                         </Text>
                    </View>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     navContainer: {
          position: "absolute",
          bottom: 0,
          backgroundColor: "steelblue",
          height: 55,
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row"
     }
});
