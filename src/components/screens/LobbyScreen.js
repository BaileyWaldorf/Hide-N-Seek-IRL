import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";
import Firebase from "firebase";

var config = {
    apiKey: "AIzaSyAKDJGxE31RnypjNu6SbiHW8KAY6WviEQg",
    authDomain: "hide-n-seek-irl.firebaseapp.com",
    databaseURL: "https://hide-n-seek-irl.firebaseio.com/",
    projectId: "hide-n-seek-irl",
    storageBucket: "hide-n-seek-irl.appspot.com",
    messagingSenderId: "320712075057"
  };
	
Firebase.initializeApp(config);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class LobbyScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 lobbyName: '',
			 lobbyPassword: '',
			 selectedHours: 0,
			 selectedMinutes: 0,
			 gameLength: 0,
		 };
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTransparent: true,
			title: `Welcome to ${navigation.state.params.sesId}`,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};


	render() {
		const { selectedHours, selectedMinutes } = this.state;
		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', top: 0, left: 0, width, height}}>
					<Image style={{flex: 1, resizeMode: 'stretch'}}
						source={require('./HomeScreenBackgroundBlurred.jpg')}
					/>
				</View>
        <View style={styles.Ruleslistbox}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Game Info</Text>
        </View>
        <View style={styles.Seekerlistbox}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Seeker</Text>
        </View>
        <View style={styles.Hiderlistbox}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Hiders</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.joinGameButton}
            onPress={() => this.props.navigation.navigate('Lobby', { Gamename: navigation.state.params.Gamename})}
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
  buttonContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width, position: 'absolute',
		bottom: 40
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
  Seekerlistbox: {
      height: 80,
      width: 350,
      padding: 20,
      backgroundColor: 'rgba(16, 59, 89, 0.4)',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 20,
  },
  Hiderlistbox: {
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
  Ruleslistbox: {
    height: 100,
    width: 350,
    padding: 20,
    backgroundColor: 'rgba(16, 59, 89, 0.4)',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    marginTop: 70,
  },
});
