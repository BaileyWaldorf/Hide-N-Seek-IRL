import React from 'react';
<<<<<<< HEAD
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, KeyboardAvoidingView } from 'react-native';
=======
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, KeyboardAvoidingView, Alert } from 'react-native';
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { Font } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class JoinGameScreen extends React.Component {
	constructor(props) {
		super(props);
<<<<<<< HEAD
			this.state = {
			gamename: "",
			showLogo: false,
			loading: false,
			sesId: '',
		};
	}

	static navigationOptions = {
		header: null
	}

	disableButtons = () => {
		if(this.state.gamename.length > 0)
			return false;
		else
			return true;
	}

	handlegamenameInput = (name) => {
		this.setState({ gamename: name })
	}

	startGame = (type) => {
		let screen = type == 'create' ? 'CreateGame' : 'Lobby';
		this.setState({loading: true});
		if(this.state.sesId == '') {
			return(fetch(`https://us-central1-hide-n-seek-irl.cloudfunctions.net/joinSession?ID=${this.props.navigation.state.params.uid}&session=${this.state.gamename}`)
				.then(response => response.text())
				.then(text => {
					console.log(text);
					this.setState({sesId: text, showLogo: true, loading: false}, () => {
						this.props.navigation.navigate(screen, { name: this.state.gamename, sesId: this.state.sesId})
					});
				})
				.catch(e => {
					console.log(e);
					this.setState({loading: false});
					return e;
				})
			)
		} else {
			return(fetch(`https://us-central1-hide-n-seek-irl.cloudfunctions.net/updateAccount?gamename=${this.state.gamename}&ID=${this.state.sesId}`)
				.then(response => response.text())
				.then(text => {
					console.log(text);
					this.setState({sesId: text, showLogo: true, loading: false}, () => {
						this.props.navigation.navigate(screen, { name: this.state.gamename, uid: this.state.sesId})
					});
				})
				.catch(e => {
					console.log(e);
					this.setState({loading: false});
					return e;
				})
			)
		}
=======
		this.state = {
			gameName: "",
			loading: false,
			gameReference: "",
			hostID: ""
		};
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTransparent: true,
			title: `Welcome ${navigation.state.params.name}!	ID: ${navigation.state.params.uid}`,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};

	handleHostIDInput = (id) => {
		this.setState({ hostID: id })
	}

	joinGame = (join) => {
		console.log("join game button clicked");
		this.setState({loading: true});

		return(fetch(`https://us-central1-hide-n-seek-irl.cloudfunctions.net/joinSession?ID=${this.props.navigation.state.params.uid}&session=${this.state.hostID}`)
			.then(response => response.json())
			.then(response => {
				console.log("game data =", response);
				this.setState({gameReference: response.session, gameName: response.name, loading: false}, () => {
					this.props.navigation.navigate("Lobby", {
						gameID: this.props.navigation.state.params.uid,
						gameReference: this.state.gameReference,
						gameName: this.state.gameName,
						host: this.props.navigation.state.params.host
					})
				});
			})
			.catch(e => {
				console.log(e);
				Alert.alert(
					'Game Not Joinable', 'The game you are trying to connect to does not exist.',
					[{text: 'OK', onPress: () => console.log('OK Pressed')}],
					{ cancelable: false }
				)
				this.setState({loading: false});
				return e;
			})
		)
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
	}

	render() {
		const offset = Platform.OS === 'ios' ? 0 : -40;
<<<<<<< HEAD
		const disabled = this.state.gamename.length == 0;
=======
		const disabled = this.state.hostID.length == 0;
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={offset} behavior="padding" enabled>
					<View style={styles.header}>
						<Image
							style={{flex: 1, width, height}}
							source={require('./HomeScreenBackground2.jpg')}
						/>
<<<<<<< HEAD
						{this.state.showLogo ? (
							<Image
								style={styles.logo}
								source={require('./Logo.png')}
							/>
						) : null }
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Enter Game ID..."
							placeholderTextColor = "white"
							autoCapitalize = "none"
							onChangeText = {this.handlegamenameInput}
							onFocus={() => {this.setState({showLogo: false})}}
							onEndEditing={() => {this.setState({showLogo: false})}}
=======
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Enter The Host's ID..."
							placeholderTextColor = "white"
							autoCapitalize = "none"
							onChangeText = {this.handleHostIDInput}
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
						/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={disabled ? styles.disabledJoinGameButton : styles.joinGameButton}
								disabled={disabled || this.state.loading}
<<<<<<< HEAD
								onPress={
									() => {this.startGame('join')}
								}
							>
								<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>JOIN GAME</Text>
=======
								onPress={() => this.joinGame('join')}
							>
								{this.state.loading
									? <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>LOADING...</Text>
									: <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>JOIN</Text>
								}
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
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
<<<<<<< HEAD
		backgroundColor: '#444'
=======
		backgroundColor: '#444',
		justifyContent: 'center'
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
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
	buttonContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width, position: 'absolute',
		bottom: 40
	},
<<<<<<< HEAD
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
=======
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
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
