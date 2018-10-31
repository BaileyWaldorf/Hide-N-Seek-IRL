import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";
import Modal from "react-native-modal";
import { MapView, Constants, PROVIDER_GOOGLE } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lobbyName: '',
			lobbyPassword: '',
			gameLength: 15,
			mapRadius: 50,
			showMapModal: false,
			LATLNG: {
				latitude: 37.78825,
				longitude: -122.4324,
			},
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

	_toggleModal = () => {
    	this.setState({ showMapModal: !this.state.showMapModal })
	}

	handleLobbyNameInput = (name) => {
		this.setState({ lobbyName: name })
	}

	handleLobbyPasswordInput = (password) => {
		this.setState({ lobbyPassword: password })
	}

	testFunction = () => {
		var URL = "https://us-central1-hide-n-seek-irl.cloudfunctions.net/helloWorld"
		const query = "Bailey"
		URL = `${URL}?name=${query}`

		fetch(URL)
		.then(response => response.json())
		.then(response => {
			console.log(response.say)
		})
		.catch(err => {
			console.error(err)
		})
	}

	render() {
		const disabled = this.state.lobbyName.length == 0;
		const name = this.props.navigation.state.params.name;
		const uid = this.props.navigation.state.params.uid;
		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
				<View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', marginTop: 70}}>
					<TextInput style = {styles.input}
						underlineColorAndroid = "transparent"
						placeholder = "Lobby name..."
						placeholderTextColor = "white"
						autoCapitalize = "none"
						onChangeText = {this.handleLobbyNameInput}
					/>
					<TextInput style = {styles.input}
						underlineColorAndroid = "transparent"
						placeholder = "Lobby password... (optional)"
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
							minimumValue={5}
							maximumValue={60}
							step={5}
							minimumTrackTintColor='#e89a47'
							thumbStyle={styles.sliderThumb}
							animateTransitions={true}
						/>
						<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
							<Icon
								name='md-locate'
								type='ionicon'
								color='white'
							/>
							<Text style={{color: 'white', fontSize: 17, textAlign: 'center', marginLeft: 8}}>Map Limit: {this.state.mapRadius} meters</Text>
						</View>
						<View style={{alignItems: 'center'}}>
							<TouchableOpacity
								style={styles.selectRadiusButton}
								onPress={this._toggleModal}
							>
								<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>SELECT RADIUS</Text>
							</TouchableOpacity>
						</View>
						{/* <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
							<Icon
								name='md-person-add'
								type='ionicon'
								color='white'
							/>
							<Text style={{color: 'white', fontSize: 17, textAlign: 'center', marginLeft: 8}}>Add Players</Text>
						</View> */}
					</View>
					<TouchableOpacity
						style={disabled ? styles.disabledCreateButton : styles.createButton}
						disabled={disabled}
						onPress={
							() => this.props.navigation.navigate('CreateGame', { name: this.state.username })
						}
					>
						<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>CREATE GAME</Text>
					</TouchableOpacity>
					<Modal style ={{flex: 1, marginTop: 80, marginBottom: 80, marginLeft:40, marginRight: 40, borderRadius: 20}}
						isVisible={this.state.showMapModal}>
						<View style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 20 }}>
							<View style={styles.mapContainer}>
								<MapView
									style={{flex: 1}}
									provider={PROVIDER_GOOGLE}
									customMapStyle={mapStyle}
									minZoomLevel={17}
									initialRegion={{
										latitude: 37.78825,
										longitude: -122.4324,
										latitudeDelta: 0.015,
										longitudeDelta: 0.0121,
									}}
								>
									<MapView.Circle
										center = { this.state.LATLNG }
										radius = { this.state.mapRadius }
										strokeWidth = { 1 }
										strokeColor = { '#1a66ff' }
										fillColor = { 'rgba(230,238,255,0.5)' }
									/>
								</MapView>
							</View>
							<View style={{alignItems: 'center'}}>
								<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
									<TouchableOpacity style={{marginRight: 5}} onPress={() => {this.setState({mapRadius: this.state.mapRadius - 1})}}>
										<Text style={{color: 'green', fontWeight: 'bold', fontSize: 55}}>-</Text>
									</TouchableOpacity>
									<Text style={{fontSize: 25}}>{this.state.mapRadius} meters</Text>
									<TouchableOpacity style={{marginLeft: 5}} onPress={() => {this.setState({mapRadius: this.state.mapRadius + 1})}}>
										<Text style={{color: 'green', fontWeight: 'bold', fontSize: 55}}>+</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity style={styles.doneButton} onPress={this._toggleModal}>
									<Text style={{color: 'white', fontWeight: 'bold'}}>DONE</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
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
	mapContainer: {
		flex: 1,
		margin: 10,
		overflow: 'hidden',
		borderRadius: 20,
		shadowOpacity: 0.4,
		shadowRadius: 1,
		shadowOffset: {height: 2, width: 0}
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
		height: 250,
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
	},
	selectRadiusButton: {
		width: 200,
		marginTop: 20,
		padding: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		borderRadius: 8,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	doneButton: {
		height: 44,
		width: 100,
		marginBottom: 20,
		backgroundColor: '#4bb53a',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 4,
		borderColor: '#2f7723'
	},
	createButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: '#4bb53a',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	disabledCreateButton: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: 'rgba(130, 188, 120, 0.5)',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
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
