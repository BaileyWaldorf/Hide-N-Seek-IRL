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
			sender: "",
			packageData: []
		};
		this.addPackage = this.addPackage.bind(this)
	}

	addPackage = (carrier) => {
		const parseString = require('react-native-xml2js').parseString;

		fetch('http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22%20?%3E%20%3CTrackRequest%20USERID=%22901UNIVE3130%22%3E%20%3CTrackID%20ID=%229400111298370362821472%22%3E%3C/TrackID%3E%3C/TrackRequest%3E')
			.then(response => response.text())
			.then((response) => {
				parseString(response, (err, result) => {
					this.setState({packageData: result}, () => {
						console.log(this.state.packageData)
					});
				});
			}).catch((err) => {
				console.log('fetch', err)
			})
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
					<TouchableOpacity style={styles.addButton} onPress={this.addPackage}>
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
