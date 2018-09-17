import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { MapView, Constants, PROVIDER_GOOGLE } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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

	static navigationOptions = {
		title: 'Welcome!',
		headerStyle: {
			backgroundColor: '#40776f',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
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
					<TouchableOpacity style={styles.buttonContainer}>
						<Image
							style={styles.button}
							source={require('./account_circle.png')}
						/>
					</TouchableOpacity>
					<View style={styles.mapContainer}>
						<MapView
							style={styles.map}
							provider={PROVIDER_GOOGLE}
							customMapStyle={mapStyle}
							initialRegion={{
								latitude: 37.78825,
								longitude: -122.4324,
								latitudeDelta: 0.015,
								longitudeDelta: 0.0121,
							}}
						/>
					</View>
					<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', width}}>
						<TouchableOpacity style={styles.mainScreenButton} onPress={() => this.props.navigation.navigate('CreateGame', { name: this.state.username })}>
							<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Create Game</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.mainScreenButton} onPress={() => this.props.navigation.navigate('JoinGame', { name: this.state.username })}>
							<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Join Game</Text>
						</TouchableOpacity>
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
		marginLeft: 10,
		top: 10,
		paddingLeft: 10,
		height: 40,
		width: 200,
		backgroundColor: '#59A499',
		borderRadius: 5,
		color: 'white'
	},
	mapContainer: {
		flex: .98,
		marginTop: 60,
	},
	map: {
		flex: 1,
		width,
		height
	},
	buttonContainer: {
		position: 'absolute',
		width: 60,
		height: 60,
		top: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		width: 40,
		height: 40,
	},
	mainScreenButton: {
		height: 100,
		width: 160,
		margin: 20,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: '#59A499',
		borderRadius: 7,
		borderBottomWidth: 7,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#67bfb1'
	}
});

const mapStyle = [
	{
		"featureType": "water",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#1A87D6" }
		]
	},
	{
		"featureType": "landscape",
		"stylers": [
			{ "color": "#AFFFA0" }
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{ "color": "#59A499" }
		]
	},
	{
		"featureType": "poi",
		"stylers": [
			{ "color": "#EAFFE5" }
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "color": "#F0FF8D" },
			{ "weight": 2.2 }
		]
	},
	{
		"featureType": "poi.business",
		"stylers": [
			{ "visibility": "off" }
		]
	},
	{
		"featureType": "poi.government",
		"stylers": [
			{ "visibility": "off" }
		]
	},
	{
		"featureType": "administrative.locality",
		"stylers": [
			{ "visibility": "off" }
		]
	}
]
