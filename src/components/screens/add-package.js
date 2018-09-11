import React from "react";
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Button, KeyboardAvoidingView, Platform } from "react-native";
import InputScrollView from 'react-native-input-scroll-view';

export default class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTutorial: false,
			trackingNumber: "",
			carrier: "",
			itemName: "",
			sender: "",
			recipient: "",
			packageData: []
		};
	}

	autofillCarrier = () => {
		let prefix;
		let suffix;
		switch(this.state.trackingNumber.length) {
		    case 22:
				prefix = this.state.trackingNumber.slice(0, 5);
		        if(prefix === '94001' || prefix === '92055' || prefix === '94073' || prefix ==='93033' || prefix ==='92701' || prefix ==='92088' || prefix ==='92021') {
					this.setState({carrier: 'USPS'});
					return 1;
				}
		        break;
		    case 13:
				prefix = this.state.trackingNumber.slice(0, 2);
				suffix = this.state.trackingNumber.slice(-2);
				if(prefix === 'EC' || prefix === 'EA' || prefix === 'CP') {
					if(suffix === 'US') {
						this.setState({carrier: 'USPS'});
						return 1;
					}
				}
		        break;
			case 18:
				prefix = this.state.trackingNumber.slice(0, 2);
				if(prefix === '1Z') {
					this.setState({carrier: 'UPS'});
					return 2;
				}
				break;
			case 10:
				prefix = this.state.trackingNumber.slice(0, 2);
				if(prefix === '82') {
					this.setState({carrier: 'USPS'});
					return 1;
				}
				else {
					this.setState({carrier: 'DHL'});
					return 3;
				}
				break;
			default:
				return 0;
		}
	}

	addPackage = (carrier) => {
		const parseString = require('react-native-xml2js').parseString;

		fetch(`http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22%20?%3E%20%3CTrackRequest%20USERID=%22901UNIVE3130%22%3E%20%3CTrackID%20ID=%22${this.state.trackingNumber}%22%3E%3C/TrackID%3E%3C/TrackRequest%3E`)
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
		const offset = Platform.OS === 'ios' ? 0 : -80;
		return(
			<KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={offset} behavior="padding" enabled>
				<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
					<TextInput style = {styles.trackingNumberInput}
						underlineColorAndroid = "transparent"
						placeholder = "Tracking Number"
						placeholderTextColor = "grey"
						autoCapitalize = "none"
						onChangeText = {(trackingNumber) => this.setState({trackingNumber})}
						returnKeyType='next'
						onSubmitEditing={() => { this.secondTextInput.focus(); }}
						blurOnSubmit={false}
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
					onFocus = {this.autofillCarrier}
					defaultValue = {this.state.carrier}
					onChangeText = {(carrier) => this.setState({carrier})}
					returnKeyType='next'
					ref={(input) => { this.secondTextInput = input; }}
					onSubmitEditing={() => { this.thirdTextInput.focus(); }}
					blurOnSubmit={false}
				/>
				<TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Item Name (optional)"
					placeholderTextColor = "grey"
					autoCapitalize = "none"
					onChangeText = {(itemName) => this.setState({itemName})}
					returnKeyType='next'
					ref={(input) => { this.thirdTextInput = input; }}
					onSubmitEditing={() => { this.forthTextInput.focus(); }}
					blurOnSubmit={false}
				/>
				<TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Sender (optional)"
					placeholderTextColor = "grey"
					autoCapitalize = "none"
					onChangeText = {(sender) => this.setState({sender})}
					returnKeyType='next'
					ref={(input) => { this.forthTextInput = input; }}
					onSubmitEditing={() => { this.fifthTextInput.focus(); }}
					blurOnSubmit={false}
				/>
				<TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Recipient (optional)"
					placeholderTextColor = "grey"
					autoCapitalize = "none"
					onChangeText = {(recipient) => this.setState({recipient})}
					ref={(input) => { this.fifthTextInput = input; }}
				/>
				<View style={{alignItems: 'center'}}>
					<TouchableOpacity style={styles.addButton} onPress={this.addPackage}>
						<Text style={{color: 'white', fontWeight: 'bold'}}>ADD</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
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
		alignItems: "center",
		justifyContent: "center"
	}
});
