import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { Constants } from 'expo';

import HomeScreen from './src/components/screens/HomeScreen';
import CreateGameScreen from './src/components/screens/CreateGameScreen';
import JoinGameScreen from './src/components/screens/JoinGameScreen';
import GameLobby from './src/components/screens/GameLobby';
import GameScreen from './src/components/screens/GameScreen';

const HideNSeek = createStackNavigator({
	Home: {screen: HomeScreen},
	CreateGame: {screen: CreateGameScreen},
	JoinGame: {screen: JoinGameScreen},
	Lobby: {screen: GameLobby},
	Game: {screen: GameScreen}
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
