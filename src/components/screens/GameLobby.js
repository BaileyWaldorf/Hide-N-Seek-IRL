import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const firebase = require('@firebase/app').default;

var app = firebase.initializeApp({
	apiKey: 'AIzaSyAKDJGxE31RnypjNu6SbiHW8KAY6WviEQg',
	authDomain: 'hide-n-seek-irl.firebaseapp.com',
	databaseURL: 'https://hide-n-seek-irl.firebaseio.com/',
	projectId: 'hide-n-seek-irl',
	storageBucket: 'hide-n-seek-irl.appspot.com',
	messagingSenderId: '320712075057'
});

require('@firebase/firestore');
var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export default class GameLobby extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 seekersList: [],
			 hidersList: [],
			 gameInfo: null
		 };
	}

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
		let gameRef = `Game Sessions/${this.props.navigation.state.params.gameReference}`;
		var gameReference = firestore.doc(gameRef);
		console.log("game reference = ", gameReference.id)
		var seekersListRef = gameReference.collection('Seeker');
		var hidersListRef = gameReference.collection('Hiders');

		gameReference.get()
		.then(documentSnapshot => {
			this.setState({gameInfo: documentSnapshot.data()}, () => {
				console.log("gameInfo = ", this.state.gameInfo)
			});
		})
		.catch(e => {
			console.log(e);
			return e;
		})

		seekersListRef.get()
		.then(querySnapshot => {
			this.setState({seekersList: querySnapshot.docs});
		})
		.catch(e => {
			console.log(e);
			return e;
		})

		setInterval(() => {
			console.log("retrieving hiders... and checking if game started");

			gameReference.get()
			.then(documentSnapshot => {
				this.setState({gameInfo: documentSnapshot.data()}, () => {
					if(this.state.gameInfo.started == true) {
						this.props.navigation.navigate("Game", {gameInfo: this.state.gameInfo});
					}
				});
			})
			.catch(e => {
				console.log(e);
				return e;
			})

			hidersListRef.get()
			.then(querySnapshot => {
				this.setState({hidersList: querySnapshot.docs});
			});
		}, 1000);
	}

	startGame = (start) => {
		console.log("button clicked")

		let gameRef = `Game Sessions/${this.props.navigation.state.params.gameReference}`;
		var gameReference = firestore.doc(gameRef);

		gameReference.set({started: true})
		.then(res => {
			console.log(`Document written at ${res.updateTime}`);
			this.props.navigation.navigate("Game", {gameInfo: this.state.gameInfo})
		})
		.catch(e => {
			console.log(e);
			return e;
		})
	}

	render() {
		let name = this.state.gameInfo == null ? null : this.state.gameInfo.name;
		let UID = this.state.gameInfo == null ? null : this.state.gameInfo.UID;
		let radius = this.state.gameInfo == null ? null : this.state.gameInfo.radius;
		let time = this.state.gameInfo == null ? null : this.state.gameInfo.time;

		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
				<View style={styles.gameInfoContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Game Info</Text>
					<View style={{margin: 10, paddingLeft: 20, paddingRight: 20, width: '100%'}}>
						<View style={{flexDirection: 'row'}}>
							<View style={styles.leftContainer}><Text style={styles.text}>Name:</Text></View>
							<View style={styles.rightContainer}><Text style={styles.text}>{name}</Text></View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={styles.leftContainer}><Text style={styles.text}>Host ID:</Text></View>
							<View style={styles.rightContainer}><Text style={styles.text}>{UID}</Text></View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={styles.leftContainer}><Text style={styles.text}>Map Radius</Text></View>
							<View style={styles.rightContainer}><Text style={styles.text}>{radius} meters</Text></View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={styles.leftContainer}><Text style={styles.text}>Timer</Text></View>
							<View style={styles.rightContainer}><Text style={styles.text}>{time} minutes</Text></View>
						</View>
					</View>
				</View>
				<View style={styles.seekersContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Seeker(s)</Text>
					<ScrollView style={{marginTop: 10, paddingLeft: 20, paddingRight: 20, width: '100%'}}>
						{this.state.seekersList.map(seeker =>
							<Text style={{color: 'white', fontSize: 17}} key={seeker.get("UID")}>{seeker.get("username")}</Text>
						)}
					</ScrollView>
				</View>
				<View style={styles.hidersContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Hider(s)</Text>
					<ScrollView style={{margin: 10, paddingLeft: 20, paddingRight: 20, width: '100%'}}>
						{this.state.hidersList.map(hider =>
							<Text style={{color: 'white', fontSize: 17}} key={hider.get("UID")}>{hider.get("username")}</Text>
						)}
					</ScrollView>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={this.props.navigation.state.params.host == true ? styles.startGameButton : styles.startGameButtonDisabled}
						onPress={() => this.startGame('start')}
					>
						<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>START GAME</Text>
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
		justifyContent: 'center'
	},
	buttonContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width, position: 'absolute',
		bottom: 30
	},
	startGameButton: {
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
	startGameButtonDisabled: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: 'rgba(229, 185, 137, 0.8)',
		borderRadius: 8,
		borderWidth: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.5)'
	},
	gameInfoContainer: {
	  height: 150,
	  width: 350,
	  padding: 10,
	  backgroundColor: 'rgba(16, 59, 89, 0.4)',
	  alignItems: 'center',
	  borderRadius: 10,
	  borderWidth: 1,
	  borderColor: 'black',
	  marginBottom: 20,
	  marginTop: -30,
	},
	seekersContainer: {
		height: 80,
		width: 350,
		padding: 10,
		backgroundColor: 'rgba(16, 59, 89, 0.4)',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 20,
	},
	hidersContainer: {
		height: 250,
		width: 350,
		padding: 20,
		backgroundColor: 'rgba(16, 59, 89, 0.4)',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 20,
	},
	leftContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems:'flex-start',
	},
	rightContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	text: {
		color: 'white',
		fontSize: 17
	}
});
