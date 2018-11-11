import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { MapView, Constants, Location, Permissions, PROVIDER_GOOGLE } from 'expo';
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locationResult: null,
			latitude: LATITUDE,
			longitude: LONGITUDE,
			routeCoordinates: [],
			distanceTravelled: 0,
			prevLatLng: {},
			coordinate: new AnimatedRegion({
				latitude: LATITUDE,
				longitude: LONGITUDE
			})
		};
	}

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				const { coordinate, routeCoordinates, distanceTravelled } = this.state;
				const { latitude, longitude } = position.coords;

				const newCoordinate = {
					latitude,
					longitude
				};
				if (Platform.OS === "android") {
					if (this.marker) {
						this.marker._component.animateMarkerToCoordinate(
							newCoordinate,
							500
						);
					}
				} else {
					coordinate.timing(newCoordinate).start();
				}
				this.setState({
					latitude,
					longitude,
					routeCoordinates: routeCoordinates.concat([newCoordinate]),
					distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
					prevLatLng: newCoordinate
				}, () => {console.log("state =" , this.state)});
			},
			error => console.log(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	calcDistance = newLatLng => {
		const { prevLatLng } = this.state;
		return haversine(prevLatLng, newLatLng) || 0;
	};

	getMapRegion = () => ({
		latitude: this.state.latitude,
		longitude: this.state.longitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA
	});

	render() {
		const location = {
			latitude: this.state.locationResult == null ? 37.78825 : this.state.locationResult.coords.latitude,
			longitude: this.state.locationResult == null ? -122.4324 : this.state.locationResult.coords.longitude,
		}
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					customMapStyle={mapStyle}
					showUserLocation
					followUserLocation
					loadingEnabled
					region={this.getMapRegion()}
				>
					<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
					<Marker.Animated
						ref={marker => {
							this.marker = marker;
						}}
						coordinate={this.state.coordinate}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={[styles.bubble, styles.button]}>
							<Text style={styles.bottomBarContent}>
								{parseFloat(this.state.distanceTravelled).toFixed(2)} km
							</Text>
						</TouchableOpacity>
					</View>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		alignItems: "center",
		justifyContent: 'flex-end'
	},
	buttonContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 40
	},
	map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
