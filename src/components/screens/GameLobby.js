import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class GameLobby extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 seekersList: [],
			 hidersList: [],
			 gameInfo: null
		 };
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTransparent: true,
			title: `Game: ${navigation.state.params.gameName}`,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};

	componentDidMount() {
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

		let gameRef = `Game Sessions/${this.props.navigation.state.params.gameReference}`;
		var gameReference = firestore.doc(gameRef);
		console.log("game refernece = ", gameReference.id)
		var seekersListRef = gameReference.collection('Seeker');
		var hidersListRef = gameReference.collection('Hiders');

		seekersListRef.get()
		.then(querySnapshot => {
			this.setState({seekersList: querySnapshot.docs});
		});

		setInterval(() => {
			console.log("retrieving hiders...");

			hidersListRef.get()
			.then(querySnapshot => {
				this.setState({hidersList: querySnapshot.docs});
			});
		}, 5000);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
				<View style={styles.gameInfoContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Game Info</Text>
					<View>
						<Text>Test</Text>
					</View>
				</View>
				<View style={styles.seekersContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Seeker(s)</Text>
					<ScrollView>
						{this.state.seekersList.map(seeker =>
							<Text key={seeker.get("UID")}>{seeker.get("username")}</Text>
						)}
					</ScrollView>
				</View>
				<View style={styles.hidersContainer}>
					<Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Hider(s)</Text>
					<ScrollView>
						{this.state.hidersList.map(hider =>
							<Text key={hider.get("UID")}>{hider.get("username")}</Text>
						)}
					</ScrollView>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={this.props.navigation.state.params.host == true ? styles.startGameButton : styles.startGameButtonDisabled}
						onPress={() => this.props.navigation.navigate("Game", {gameInfo: this.state.gameInfo})}
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
		bottom: 40
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
	  height: 100,
	  width: 350,
	  padding: 20,
	  backgroundColor: 'rgba(16, 59, 89, 0.4)',
	  alignItems: 'center',
	  borderRadius: 10,
	  borderWidth: 1,
	  borderColor: 'black',
	  marginBottom: 20,
	  marginTop: 70,
	},
	seekersContainer: {
		height: 80,
		width: 350,
		padding: 20,
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
	}
});
