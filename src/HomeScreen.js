mport React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
// import MainMenuMap from '../common/main-menu-map'

export default class HomeScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			  username: "",
		 };
	}

	handleUsernameInput = (name) => {
		this.setState({ username: name })
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TextInput style = {styles.input}
						underlineColorAndroid = "transparent"
						placeholder = "Choose a username..."
						placeholderTextColor = "white"
						autoCapitalize = "none"
						onChangeText = {this.handleUsernameInput}
					/>
					<TouchableOpacity>
						<Icon
							containerStyle={styles.headerIcon}
							name = 'account-circle'
							type = 'material-community'
							color = 'white'
							size = {40}
						/>
					</TouchableOpacity>
				</View>
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
