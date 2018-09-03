import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';




//creating a component
class LoginForm extends Component {
    render() {
        return (
            <view style={styles.container}>
                <TextInput style = {styles.input}
                    autoCapitalize='none'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    placeholder='johnsmith@email.com'
                    placeholderTextColor='white'/>
                
                <TextInput style = {styles.input}
                    returnKeyType='go'
                    ref={(input)=> this.passwordInput = input}
                    placeholder='password'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    secureTextEntry/>
                
                <TouchableOpacity style= {styles.buttonContainer}
                    onPress={onButtonPress}>
                    <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
            
            </view>
        );
    }
}



class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Lin</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    input: {
        height: 40,
        backgroundColor: '#FFBBAA',
        marginBottom: 10,
        padding: 10,
        color: 'red'
    },

    buttonContainer: {
        backgroundColor: 'black',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff', 
        textAlign: 'center',
        fontWeight: '700'
    }
});


export default LoginForm;