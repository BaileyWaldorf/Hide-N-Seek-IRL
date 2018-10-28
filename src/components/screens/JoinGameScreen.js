import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { MapView, Constants, PROVIDER_GOOGLE } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			  Gamename: "",
			  showLogo: true
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

	handleGamenameInput = (Gamename) => {
		this.setState({ game: Gamename })
	}



	render() {
		const offset = Platform.OS === 'ios' ? 0 : -40;
		const disabled = this.state.Gamename.length == 0;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={offset} behavior="padding" enabled>
					<View style={styles.header}>
						<Image
							style={{flex: 1, width, height}}
							source={require('./HomeScreenBackground2.jpg')}
						/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Enter Game Id..."
							placeholderTextColor = "white"
							autoCapitalize = "none"
							onChangeText = {this.handleGamenameInput}
							onFocus={() => {this.setState({showLogo: false})}}
							onEndEditing={() => {this.setState({showLogo: true})}}
						/>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={styles.joinGameButton}
									onPress={() => this.props.navigation.navigate('Lobby', { Gamename: this.state.game })}
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
	button: {
		width: 40,
		height: 40,
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
});
