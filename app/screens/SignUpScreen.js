import React, { useState } from 'react'
import { Button, Text, TextInput, Image, View } from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'

import { styles } from '../styles/styles.js'

export default function SignUpScreen() {
	const [firstName, onChangeFirstName] = useState('')
	const [lastName, onChangeLastName] = useState('')
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')
	const [dateOfBirth, onChangeDateOfBirth] = useState('')
	const [githubLink, onChangeGithubLink] = useState('')
	const [mode, setMode] = useState('date')
	const [show, setShow] = useState(false)

	const showMode = (currentMode) => {
		setShow(true)
		setMode(currentMode)
	}

	const showDatepicker = () => {
		showMode('date')
	}
	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<Text style={styles.title}>signup</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeFirstName(text)}
					value={firstName}
					keyboardType='default'
					placeholder='First Name'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeLastName(text)}
					value={lastName}
					keyboardType='default'
					placeholder='Last Name'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeEmail(text)}
					value={email}
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					placeholder='Email'
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.textInput}
					onChangeText={(text) => onChangePassword(text)}
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='Password'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeDateOfBirth(text)}
					value={dateOfBirth}
					keyboardType='number-pad'
					placeholder='DOB - YYYY-MM-DD'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeGithubLink(text)}
					value={githubLink}
					keyboardType='url'
					placeholder='Github Link'
				/>
				<Button
					title='Sign up'
					onPress={() =>
						console.log(
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
		</>
	)
}
