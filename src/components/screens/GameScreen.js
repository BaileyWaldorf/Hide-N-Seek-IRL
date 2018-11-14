import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import  MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'expo';
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import haversine from "haversine";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;

export default class CreateGameScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLeft: parseInt(this.props.navigation.state.params.gameInfo.time, 10) * 60,
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

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
		console.log("time =", this.props.navigation.state.params.gameInfo.time);

		this.interval = setInterval(() => {
			if(this.state.timeLeft > 0) {
				this.setState(prevState => ({
					timeLeft: prevState.timeLeft - 1
				}))
			} else {
				clearInterval(this.interval)
			}
		}, 1000)

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
						coordinate.timing(newCoordinate).start();
					}
					coordinate.timing(newCoordinate).start();
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
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		navigator.geolocation.clearWatch(this.watchID);
	}

	secondsToMMSS(seconds) {
		let min = Math.floor(seconds / 60);
		let sec = seconds - (min * 60);
		return `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
	}

	calcDistance = newLatLng => {
		const { prevLatLng } = this.state;
		return haversine(prevLatLng, newLatLng) || 0;
	};

	getInitialRegion = () => {
		setTimeout(() => {
			getMapRegion = () => ({
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			});
		}, 3000)
	}

	onRegionChange(region) {
		this.setState({latitude: region.latitude, longitude: region.longitude});
	}

	render() {
		const location = {
			latitude: this.state.locationResult == null ? 37.78825 : this.state.locationResult.coords.latitude,
			longitude: this.state.locationResult == null ? -122.4324 : this.state.locationResult.coords.longitude,
		}
		const count = ( this.state.timeLeft > 0 ) ? this.secondsToMMSS(this.state.timeLeft) : '00:00'
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					customMapStyle={mapStyle}
					showUserLocation
					followUserLocation
					loadingEnabled
					showsMyLocationButton={true}
					initialRegion={this.getInitialRegion()}
					onRegionChangeComplete={(region) => {this.onRegionChange(region)}}
				>
					<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
					<Marker.Animated
						ref={marker => {
							this.marker = marker;
						}}
						coordinate={this.state.coordinate}
						image={require('../assets/marker.png')}
					/>
				</MapView>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.bubble, styles.button]}>
						<Text style={{color: 'black', fontWeight: 'bold'}}>
							FOUND MY SPOT!
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.statsContainer}>
					<TouchableOpacity style={[styles.bubble, styles.button]}>
						<Text>
							Time Left: {count}
						</Text>
						<Text>
							Distance Travelled: {parseFloat(this.state.distanceTravelled).toFixed(2)} km
						</Text>
					</TouchableOpacity>
				</View>
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
	statsContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 40
	},
	buttonContainer: {
		width: '60%',
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 40,
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	bubble: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.7)",
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20
	},
	button: {
		width: 80,
		paddingHorizontal: 12,
		alignItems: "center",
		marginHorizontal: 10
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
