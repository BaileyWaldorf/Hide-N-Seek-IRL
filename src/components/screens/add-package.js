import React from "react";
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Button } from "react-native";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTutorial: false,
      trackingNumber: "",
      carrier: "",
      itemName: "",
      sender: ""
    };
  }

  handleTrackingNumberInput = (number) => {
    this.setState({ trackingNumber: number })
  }

  handleCarrierInput = (text) => {
    this.setState({ carrier: text })
  }

  handleItemNameInput = (text) => {
    this.setState({ itemName: text })
  }

  handleSenderInput = (text) => {
    this.setState({ sender: text })
  }

  tutorialScreen = () => {
    return(
      <View>
        <Text>
          This is where you can add your tracking number.
          Simply type in the number or scan a barcode!
        </Text>
        <Button
          style={styles.button}
          onPress={() => this.setState({showTutorial: false})}
          title="Get Started"
        />
      </View>
    )
  }

  addScreen = () => {
    return(
      <View>
        <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
          <TextInput style = {styles.trackingNumberInput}
            underlineColorAndroid = "transparent"
            placeholder = "Tracking Number"
            placeholderTextColor = "grey"
            autoCapitalize = "none"
            onChangeText = {this.handleTrackingNumberInput}
          />
          <TouchableOpacity style={styles.barcodeButton} onPress={() => this.setState({showTutorial: true})}>
            <Image style={{width: 32, height: 32}} source={require("../assets/barcode-icon.png")}/>
          </TouchableOpacity>
        </View>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Carrier"
          placeholderTextColor = "grey"
          autoCapitalize = "none"
          onChangeText = {this.handleCarrierInput}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Item Name (optional)"
          placeholderTextColor = "grey"
          autoCapitalize = "none"
          onChangeText = {this.handleItemNameInput}
        />
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Sender (optional)"
          placeholderTextColor = "grey"
          autoCapitalize = "none"
          onChangeText = {this.handleSenderInput}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.setState({showTutorial: true})}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showTutorial
          ? this.tutorialScreen()
          : this.addScreen()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 40,
    width: 250,
    borderColor: 'tomato',
    borderWidth: 0,
    borderBottomWidth: 1
  },
  trackingNumberInput: {
    margin: 10,
    height: 40,
    width: 250,
    borderColor: 'tomato',
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: 'flex-start'
  },
  barcodeButton: {
    height: 35,
    width: 45,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  addButton: {
    height: 44,
    width: 100,
    marginTop: 30,
    backgroundColor: 'tomato',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderColor: '#d64c33'
  },
  container: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
