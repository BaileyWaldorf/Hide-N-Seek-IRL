import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { MapView, Constants, PROVIDER_GOOGLE } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			  username: "",
			  showLogo: true
		 };
	}

	disableButtons = () => {
		if(this.state.username.length > 0)
			return false;
		else
			return true;
	}

	handleUsernameInput = (name) => {
		this.setState({ username: name })
	}

	static navigationOptions = {
		header: null
	}

	render() {
		const offset = Platform.OS === 'ios' ? 0 : -40;
		const disabled = this.state.username.length == 0;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={offset} behavior="padding" enabled>
					<View style={styles.header}>
						<Image
							style={{flex: 1, width, height}}
							source={require('./HomeScreenBackground2.jpg')}
						/>
						{this.state.showLogo ? (
							<Image
								style={styles.logo}
								source={require('./Logo.png')}
							/>
						) : null }
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Choose a username..."
							placeholderTextColor = "white"
							autoCapitalize = "none"
							onChangeText = {this.handleUsernameInput}
							onFocus={() => {this.setState({showLogo: false})}}
							onEndEditing={() => {this.setState({showLogo: true})}}
						/>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={disabled ? styles.disabledCreateGameButton : styles.createGameButton}
									disabled={disabled}
									onPress={
										() => {this.setState({showLogo: true})},
										() => this.props.navigation.navigate('CreateGame', { name: this.state.username })
									}
								>
									<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>CREATE GAME</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={disabled ? styles.disabledJoinGameButton : styles.joinGameButton}
									disabled={disabled}
									onPress={
										() => {this.setState({showLogo: true})},
										() => this.props.navigation.navigate('JoinGame', { name: this.state.username })
									}
								>
									<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>JOIN GAME</Text>
								</TouchableOpacity>
							</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: '#444'
	},
	header: {
		flex: 1,
		width: '100%',
		backgroundColor: '#40776f',
		alignItems: "flex-start",
	},
	logo: {
		flex: 1,
		position: 'absolute',
		top: 35,
		alignItems: 'center',
		width: '100%',
		height: '18%'
	},
	input: {
		position: 'absolute',
		bottom: 120,
		left: '20%',
		height: 50,
		width: 250,
		backgroundColor: 'rgba(16, 59, 89, 0.4)',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 17,
		marginBottom: 50,
		textAlign: 'center'
	},
	mapContainer: {
		flex: .98,
		marginTop: 60,
	},
	map: {
		flex: 1,
		width,
		height
	},
	buttonContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width, position: 'absolute',
		bottom: 40
	},
	button: {
		width: 40,
		height: 40,
	},
	createGameButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: '#4bb53a',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	disabledCreateGameButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: 'rgba(130, 188, 120, 0.5)',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	joinGameButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: '#e89a47',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	disabledJoinGameButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: 'rgba(229, 185, 137, 0.8)',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	}
});
