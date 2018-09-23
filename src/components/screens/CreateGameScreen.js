import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 lobbyName: '',
			 lobbyPassword: '',
			 selectedHours: 0,
			 selectedMinutes: 0,
		 };
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTransparent: true,
			title: `Welcome, ${navigation.state.params.name}!`,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};

	handleLobbyNameInput = (name) => {
		this.setState({ lobbyName: name })
	}

	handleLobbyPasswordInput = (password) => {
		this.setState({ lobbyPassword: password })
	}

	render() {
		const { selectedHours, selectedMinutes } = this.state;
		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
				<View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center'}}>
					<TextInput style = {styles.input}
						underlineColorAndroid = "transparent"
						placeholder = "Lobby name..."
						placeholderTextColor = "white"
						autoCapitalize = "none"
						onChangeText = {this.handleLobbyNameInput}
					/>
					<TextInput style = {styles.input}
						underlineColorAndroid = "transparent"
						placeholder = "Lobby password..."
						placeholderTextColor = "white"
						autoCapitalize = "none"
						onChangeText = {this.handleLobbyPasswordInput}
						secureTextEntry={true}
					/>
					<Text>{selectedHours}:{selectedMinutes}</Text>
					<TimePicker
						selectedHours={selectedHours}
						selectedMinutes={selectedMinutes}
						onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
						hoursUnit=' Hrs'
						minutesUnit=' Min'
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	header: {
		flex: .14,
		width: '100%',
		backgroundColor: 'steelblue',
		alignItems: "flex-start",
	},
	headerIcon: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 10,
	},
	input: {
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
		padding: 10,
		marginBottom: 20
	}
});
