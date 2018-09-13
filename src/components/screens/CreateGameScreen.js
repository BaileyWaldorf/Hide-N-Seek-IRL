import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {

		 };
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Join a game screen!</Text>
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
		position: 'absolute',
		marginLeft: 10,
		bottom: 10,
		paddingLeft: 10,
		height: 40,
		width: 200,
		backgroundColor: '#5b9fd8',
		borderRadius: 5,
		color: 'white'
	}
});
