import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';

let hello = "Not a member? Sign up!"

//creating a component
class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			member: true
		};
	}

	handleEmailInput = (text) => {
		this.setState({ email: text })
	}

	handlePasswordInput = (text) => {
		this.setState({ password: text })
	}

	loginPage = () => {
		return (
			<View style={styles.container}>
				<TextInput style = {styles.input}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					returnKeyType='next'
					placeholder='johnsmith@email.com'
					placeholderTextColor='grey'
					onChangeText = {this.handleEmailInput}/>

				<TextInput style = {styles.input}
					returnKeyType='go'
					placeholder='password'
					placeholderTextColor='grey'
					secureTextEntry
					onChangeText = {this.handlePasswordInput}/>
				<TouchableOpacity
					style= {styles.buttonContainer}
					onPress={console.log("logged in!!")}>
						<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
				<Button
					style={{margin: 10}}
					onPress={() => this.setState({member: false})}
					title={hello}
					color="steelblue"
				/>
			</View>
		)
	}

     signUpPage = () => {
          return (
               <View style={styles.container}>
                    <TextInput style = {styles.input}
                         autoCapitalize='none'
                         autoCorrect={false}
                         keyboardType='email-address'
                         returnKeyType='next'
                         placeholder='johnsmith@email.com'
                         placeholderTextColor='grey'
                         onChangeText = {this.handleEmailInput}/>

                    <TextInput style = {styles.input}
                         returnKeyType='go'
                         placeholder='password'
                         placeholderTextColor='grey'
                         secureTextEntry
                         onChangeText = {this.handlePasswordInput}/>
                    <TouchableOpacity
                         style= {styles.buttonContainer}
                         onPress={console.log("signed up!")}>
                              <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
               </View>
          )
     }

    render() {
        return (
            <View style={styles.container}>
                 {this.state.member
                      ? this.loginPage()
                      : this.signUpPage()
                 }
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backfaceVisibility: 'visible',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'tomato',
        margin: 10,
        padding: 10,
    },
    buttonContainer: {
         height: 44,
         width: 100,
         marginTop: 30,
         backgroundColor: 'tomato',
         borderRadius: 4,
         alignItems: 'center',
         justifyContent: 'center',
         borderBottomWidth: 4,
         borderColor: '#d64c33'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});


export default LoginForm;
