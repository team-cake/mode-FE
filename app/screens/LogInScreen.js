import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Image, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/user/actions'
import { selectToken } from '../store/user/selector'

import { styles } from '../styles/styles.js'

export default function LogInScreen() {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function onPress(email, password) {
		dispatch(login(email, password))
		setEmail('')
		setPassword('')
	}

	useEffect(() => {
		if (token !== null) {
			navigation.navigate('Home')
		}
	}, [token, navigation])

	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => setEmail(text)}
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					placeholder='email'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => setPassword(text)}
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='password'
				/>
				<Button title='Log In' onPress={() => onPress(email, password)} />
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