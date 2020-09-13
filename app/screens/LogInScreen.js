import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'

import { styles } from '../styles/styles.js'
import axios from 'axios'
import { apiUrl } from '../config/constants'

export default function LogInScreen() {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const user = useSelector((state) => state)
	// console.log('user => ', user)
	const [email, setEmail] = useState('alex@mode.com')
	const [password, setPassword] = useState('alexmode')
	const [loading, setLoading] = useState(false)
	const [showError, setShowError] = useState('')

	async function onPress(email, password) {
		setShowError('')
		setLoading(true)
		const response = await axios
			.post(`${apiUrl}/login`, {
				email,
				password,
			})
			.catch((err) => {
				setLoading(false)
				console.log('err => ', err)
			})
		setLoading(false)
		console.log('response => ', response.data)
		if (response.data && response.data.status === false) {
			setShowError(response.data.message)
		} else if (response.data && response.data.status) {
			setEmail('')
			setPassword('')
			dispatch(loginSuccess(response.data.user))
		}
	}

	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<View style={{ height: 20 }} />
				<View style={{ width: 250 }}>
					<TextInput
						style={styles.textInputLogin}
						onChangeText={(text) => setEmail(text)}
						value={email}
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='email-address'
						placeholder='email'
					/>
					<View style={{ height: 10 }} />

					<TextInput
						style={styles.textInputLogin}
						onChangeText={(text) => setPassword(text)}
						value={password}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={true}
						placeholder='password'
					/>
					<View style={{ height: 10 }} />
					<View style={{ height: 10 }}>
						{showError.length > 0 && (
							<Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>
								{showError}
							</Text>
						)}
					</View>
					<View style={{ height: 30 }} />
					<Button
						title={loading ? 'Loading...' : 'Log In'}
						onPress={() => onPress(email, password)}
					/>
					<View style={{ height: 60 }} />
					<Text
						title='Sign Up.'
						style={[styles.underline, { textAlign: 'center' }]}
						onPress={() => navigation.navigate('SignUp')}
					>
						No account yet? Sign up.
					</Text>
				</View>
			</View>
		</>
	)
}
