import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, TextInput, Image, View } from 'react-native'
import { loginSuccess } from '../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'

import DatePicker from '@react-native-community/datetimepicker'

import { styles } from '../styles/styles.js'
import axios from 'axios'
import { apiUrl } from '../config/constants'

export default function SignUpScreen() {
	const [firstName, setFirstName] = useState('elo')
	const [lastName, setLastName] = useState('elo')
	const [email, setEmail] = useState('elo@elo.com')
	const [password, setPassword] = useState('elo')
	const [dateOfBirth, setDateOfBirth] = useState('1990-01-02')
	const [githubLink, setGithubLink] = useState('elo')
	const [showError, setShowError] = useState('')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const navigation = useNavigation()

	async function onPress(
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		githubLink
	) {
		setShowError('')
		setLoading(true)
		const response = await axios
			.post(`${apiUrl}/signup`, {
				firstName,
				lastName,
				email,
				password,
				dateOfBirth,
				githubLink,
			})
			.catch((err) => {
				setLoading(false)
				console.log('err => ', err)
			})
		setLoading(false)
		if (response.data && !response.data.status) {
			console.log('error => ', response)
			setShowError(response.data.message)
		} else if (response.data && response.data.status) {
			setFirstName('')
			setLastName('')
			setEmail('')
			setPassword('')
			setDateOfBirth('')
			setGithubLink('')
			dispatch(loginSuccess(response.data.user))
		}
	}

	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<View style={{ height: 20 }} />
				<View style={{ width: 250 }}>
					<Text style={styles.title}>signup</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setFirstName(text)}
						value={firstName}
						keyboardType='default'
						placeholder='First Name'
					/>
					<View style={{ height: 10 }} />
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setLastName(text)}
						value={lastName}
						keyboardType='default'
						placeholder='Last Name'
					/>
					<View style={{ height: 10 }} />

					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setEmail(text)}
						value={email}
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='email-address'
						placeholder='Email'
					/>
					<View style={{ height: 10 }} />

					<TextInput
						secureTextEntry={true}
						style={styles.textInput}
						onChangeText={(text) => setPassword(text)}
						value={password}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={true}
						placeholder='Password'
					/>
					<View style={{ height: 10 }} />

					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setDateOfBirth(text)}
						value={dateOfBirth}
						keyboardType='number-pad'
						placeholder='DOB - YYYY-MM-DD'
					/>
					<View style={{ height: 10 }} />

					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setGithubLink(text)}
						value={githubLink}
						placeholder='Github Handle'
					/>
					<View style={{ height: 5 }} />
					<View style={{ height: 10 }}>
						{showError.length > 0 && (
							<Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>
								{showError}
							</Text>
						)}
					</View>
					<View style={{ height: 20 }} />
					<Button
						title={loading ? 'Loading...' : 'Sign up'}
						onPress={() =>
							onPress(
								firstName,
								lastName,
								email,
								password,
								dateOfBirth,
								githubLink
							)
						}
					/>
				</View>
			</View>
		</>
	)
}
