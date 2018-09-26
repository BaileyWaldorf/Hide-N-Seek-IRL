import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";

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
			 gameLength: 0,
		 };
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTransparent: true,
			title: `Welcome ${navigation.state.params.name}!`,
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
					<View style={styles.gameOptions}>
						<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
							<Icon
								name='md-stopwatch'
								type='ionicon'
								color='white'
							/>
							<Text style={{color: 'white', fontSize: 17, textAlign: 'center', marginLeft: 8}}>Time Limit: {this.state.gameLength} minutes</Text>
						</View>
						<Slider
							value={this.state.gameLength}
							onValueChange={gameLength => this.setState({ gameLength })}
							minimumValue={0}
							maximumValue={60}
							step={5}
							minimumTrackTintColor='#e89a47'
							thumbStyle={styles.sliderThumb}
							animateTransitions={true}
						/>
						<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
							<Icon
								name='md-person-add'
								type='ionicon'
								color='white'
							/>
							<Text style={{color: 'white', fontSize: 17, textAlign: 'center', marginLeft: 8}}>Add Players</Text>
						</View>
					</View>
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
		width: 350,
		backgroundColor: 'rgba(16, 59, 89, 0.4)',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginBottom: 20,
		textAlign: 'center',
		fontSize: 17
	},
	gameOptions: {
		height: 300,
		width: 350,
		padding: 20,
		backgroundColor: 'rgba(16, 59, 89, 0.4)',
		justifyContent: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 20,
	},
	sliderThumb: {
		backgroundColor: '#4bb53a',
		borderRadius: 12.5,
		borderWidth: 5,
		borderColor: '#dbdbdb',
		width: 25,
		height: 25,
		elevation: 5,
		shadowColor: 'black',
		shadowOpacity: 0.8,
		shadowRadius: 10,
	}
});
