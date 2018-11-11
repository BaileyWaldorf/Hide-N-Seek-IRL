import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";
import Modal from "react-native-modal";
import { MapView, Constants, Location, Permissions, PROVIDER_GOOGLE } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locationResult: null,
		};
	}

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ locationResult: location }, () => {console.log(this.state.locationResult)});
	};

	render() {
		const location = {
			latitude: this.state.locationResult == null ? 37.78825 : this.state.locationResult.coords.latitude,
			longitude: this.state.locationResult == null ? -122.4324 : this.state.locationResult.coords.longitude,
		}
		return (
			<View style={styles.container}>
				<View style={styles.mapContainer}>
					<MapView
						style={{flex: 1}}
						provider={PROVIDER_GOOGLE}
						customMapStyle={mapStyle}
						initialRegion={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121,
						}}
					>
						<MapView.Circle
							center = { location }
							radius = { this.props.navigation.state.params.gameInfo.radius }
							strokeWidth = { 1 }
							strokeColor = { '#1a66ff' }
							fillColor = { 'rgba(230,238,255,0.5)' }
						/>
					</MapView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: 'center'
	},
	mapContainer: {
		flex: 1,
		margin: 10,
		overflow: 'hidden',
		borderRadius: 20,
		shadowOpacity: 0.4,
		shadowRadius: 1,
		shadowOffset: {height: 2, width: 0}
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
