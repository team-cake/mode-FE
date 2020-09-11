import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/styles.js'

function AppButton({ title, onPress }) {
	return (
		<View style={styles.center}>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: 'grey' }]}
				onPress={onPress}
			>
				<Text style={styles.btnText}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default AppButton
