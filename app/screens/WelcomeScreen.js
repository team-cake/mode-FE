import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	Button,
	Platform,
} from 'react-native'

export default function WelcomeScreen() {
	return (
		<View
			style={{
				backgroundColor: '#fff',
				flex: 1,
			}}
		>
			<View
				style={{
					backgroundColor: 'dodgerblue',
					flex: 1,
				}}
			/>
			<View
				style={{
					backgroundColor: 'gold',
					flex: 1,
				}}
			/>
			<View
				style={{
					backgroundColor: 'tomato',
					flex: 1,
				}}
			/>
		</View>
	)
}

// const styles = StyleSheet.create({
// 	// container: {
// 	// 	flex: 1,
// 	// 	backgroundColor: '#fff',
// 	// 	alignItems: 'center',
// 	// 	justifyContent: 'center',
// 	// },
// 	loginButton: {
// 		width: '100%',
// 		height: 70,
// 		backgroundColor: '#fc5c65',
// 		alignSelf: 'flex-end',
// 	},
// 	signupButton: {
// 		width: '100%',
// 		height: 70,
// 		backgroundColor: '#4ecdc4',
// 		alignSelf: 'center',
// 	},
// })
