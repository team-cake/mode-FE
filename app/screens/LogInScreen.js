import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'

import { styles } from '../styles/styles.js'

export default function LogInScreen() {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const user = useSelector(selectUser)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function onPress(email, password) {
		dispatch(login(email, password))
		setEmail('')
		setPassword('')
	}

	useEffect(() => {
		if (token !== null) {
			navigation.navigate('AppNav')
		}
	}, [token, navigation])

	return (
		<>
			<View style={styles.center}>
				<StatusBar setHidden={true} />
				<Image source={require('../assets/mode_logo.png')} />
				<Text> </Text>

				<TextInput
					style={styles.textInputLogin}
					onChangeText={(text) => setEmail(text)}
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					placeholder='email'
				/>
				<Text> </Text>

				<TextInput
					style={styles.textInputLogin}
					onChangeText={(text) => setPassword(text)}
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='password'
				/>
				<Text> </Text>
				<Button title='Log In' onPress={() => onPress(email, password)} />
				<Text> </Text>
				<Text
					title='Sign Up.'
					style={styles.underline}
					onPress={() => navigation.navigate('SignUp')}
				>
					No account yet? Sign up.
				</Text>
			</View>
		</>
	)
}
