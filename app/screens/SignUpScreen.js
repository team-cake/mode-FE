import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, TextInput, Image, View } from 'react-native'
import { signUp } from '../store/user/actions'
import { selectToken } from '../store/user/selector'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DatePicker from '@react-native-community/datetimepicker'

import { styles } from '../styles/styles.js'

export default function SignUpScreen() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')
	const [githubLink, setGithubLink] = useState('')

	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const navigation = useNavigation()

	function onPress(
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		githubLink
	) {
		dispatch(
			signUp(firstName, lastName, email, password, dateOfBirth, githubLink)
		)
		setFirstName('')
		setLastName('')
		setEmail('')
		setPassword('')
		setDateOfBirth('')
		setGithubLink('')
	}
	// useEffect(() => {
	// 	if (token !== null) {
	// 		navigation.navigate('Home')
	// 	}
	// }, [token, navigation])

	return (
		<>
			<KeyboardAwareScrollView>
				<View style={styles.center}>
					<Image source={require('../assets/mode_logo.png')} />
					<Text style={styles.title}>signup</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setFirstName(text)}
						value={firstName}
						keyboardType='default'
						placeholder='First Name'
					/>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setLastName(text)}
						value={lastName}
						keyboardType='default'
						placeholder='Last Name'
					/>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setEmail(text)}
						value={email}
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='email-address'
						placeholder='Email'
					/>
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
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setDateOfBirth(text)}
						value={dateOfBirth}
						keyboardType='number-pad'
						placeholder='DOB - YYYY-MM-DD'
					/>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => setGithubLink(text)}
						value={githubLink}
						placeholder='Github Handle'
					/>
					<Button
						title='Sign up'
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
			</KeyboardAwareScrollView>
		</>
	)
}
