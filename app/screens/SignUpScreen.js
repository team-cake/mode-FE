import React, { useState } from 'react'
import { Text, TextInput, Image, View } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker'

import { styles } from '../styles/styles.js'

export default function SignUpScreen() {
	const [firstName, onChangeFirstName] = useState('')
	const [lastName, onChangeLastName] = useState('')
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')
	const [dateOfBirth, onChangeDateOfBirth] = useState('')
	const [githubLink, onChangeGithubLink] = useState('')

	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
				<Text style={styles.title}>signup</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeFirstName(text)}
					value={firstName}
					placeholder='First Name'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeLastName(text)}
					value={lastName}
					placeholder='Last Name'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeEmail(text)}
					value={email}
					placeholder='Email'
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.textInput}
					onChangeText={(text) => onChangePassword(text)}
					value={password}
					placeholder='password'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeDateOfBirth(text)}
					value={dateOfBirth}
					placeholder='Date Of Birth'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => onChangeGithubLink(text)}
					value={githubLink}
					placeholder='Github Link'
				/>
			</View>
		</>
	)
}
