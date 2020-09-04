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
	return (
		<>
			<View style={styles.center}>
				<Image source={require('../assets/mode_logo.png')} />
			</View>
		</>
	)
}
