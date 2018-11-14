import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { Font } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class JoinGameScreen extends React.Component {
	constructor(props) {
		super(props);
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
			.then(response => response.text())
			.then(response => {
				console.log('hostID =', this.state.hostID);
				console.log("game data =", response);
				if(response == "{}") {
					return Promise.reject()
				}
				this.setState({gameReference: response, loading: false}, () => {
					console.log('gameReference:', this.state.gameReference);
					this.props.navigation.navigate("Lobby", {
						gameID: this.props.navigation.state.params.uid,
						gameReference: this.state.gameReference,
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
	}

	render() {
		const offset = Platform.OS === 'ios' ? 0 : -40;
		const disabled = this.state.hostID.length == 0;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={offset} behavior="padding" enabled>
					<View style={styles.header}>
						<Image
							style={{flex: 1, width, height, resizeMode: 'cover'}}
							source={require('./HomeScreenBackground2.jpg')}
						/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Enter The Host's ID..."
							placeholderTextColor = "white"
							autoCapitalize = "none"
							onChangeText = {this.handleHostIDInput}
						/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={disabled ? styles.disabledJoinGameButton : styles.joinGameButton}
								disabled={disabled || this.state.loading}
								onPress={() => this.joinGame('join')}
							>
								{this.state.loading
									? <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>LOADING...</Text>
									: <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>JOIN</Text>
								}
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
		backgroundColor: '#444',
		justifyContent: 'center'
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
