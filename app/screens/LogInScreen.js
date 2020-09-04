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
	const [email, onChangeText] = useState('Email')
	const [password, onChangePassword] = useState('Password')
	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeText(text)}
					value={email}
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangePassword(text)}
					value={password}
				/>
				<Button title='Log In' onPress={() => {}} />
				<Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
			</View>
		</>
	)
}
