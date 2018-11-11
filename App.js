import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { Constants } from 'expo';

import HomeScreen from './src/components/screens/HomeScreen';
import CreateGameScreen from './src/components/screens/CreateGameScreen';
import JoinGameScreen from './src/components/screens/JoinGameScreen';
<<<<<<< HEAD
import LobbyScreen from './src/components/screens/LobbyScreen';
=======
import GameLobby from './src/components/screens/GameLobby';
import GameScreen from './src/components/screens/GameScreen';
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf

const HideNSeek = createStackNavigator({
	Home: {screen: HomeScreen},
	CreateGame: {screen: CreateGameScreen},
	JoinGame: {screen: JoinGameScreen},
<<<<<<< HEAD
	Lobby: {screen: LobbyScreen}

=======
	Lobby: {screen: GameLobby},
	Game: {screen: GameScreen}
>>>>>>> 14af131da670a9dd0a10df567b909f262eeea7bf
}, {
	initialRouteName: 'Home',
})

class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<HideNSeek style={{ width: Dimensions.get('window').width }} />
			</View>
		);
	}
}

export default HideNSeek;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
	},
});
