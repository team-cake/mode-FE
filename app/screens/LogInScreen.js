import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	TextInput,
	Button,
	Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { styles } from '../styles/styles.js'

export default function WelcomeScreen() {
	const navigation = useNavigation()
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')
	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeEmail(text)}
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					placeholder='email'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangePassword(text)}
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='password'
				/>
				<Button title='Log In' onPress={() => console.log(email, password)} />
				<Text
					title='Sign Up'
					style={styles.underline}
					onPress={() => navigation.navigate('SignUp')}
				>
					Sign up
				</Text>
			</View>
		</>
	)
}
