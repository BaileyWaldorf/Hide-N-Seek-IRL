import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";
import LobbyList from './LobbyList';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 lobbyName: '',
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

	render() {
		const { selectedHours, selectedMinutes } = this.state;
		return (
			<View>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
				<View style={{ marginLeft: 15, marginRight: 15, paddingTop: 50, paddingBottom: 50}}>
					<LobbyList />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
	},
	header: {
		flex: .14,
		width: '100%',
		backgroundColor: 'steelblue',
		alignItems: "flex-start",
	}
});
