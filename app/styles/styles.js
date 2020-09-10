import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 2,
		width: '15%',
		marginVertical: 3,
	},
	title: {
		fontFamily: 'Roboto-Medium',
		fontSize: 36,
		marginBottom: 16,
		textAlign: 'center',
	},
	header: {
		fontFamily: 'Roboto-Medium',
		fontSize: 25,
		marginBottom: 16,
		textAlign: 'center',
	},
	headerItalic: {
		fontFamily: 'Roboto-MediumItalic',
		fontSize: 25,
		marginBottom: 16,
		textAlign: 'center',
	},
	small: {
		fontFamily: 'Roboto-Light',
		fontSize: 15,
		marginBottom: 16,
		textAlign: 'center',
	},
	tinySmall: {
		fontFamily: 'Roboto-Light',
		fontSize: 10,
		marginBottom: 5,
		textAlign: 'center',
	},
	smallItalic: {
		fontFamily: 'Roboto-LightItalic',
		fontSize: 15,
		marginBottom: 16,
		textAlign: 'center',
	},
	androidButtonText: {
		color: 'blue',
		fontSize: 20,
	},
	text: {
		fontFamily: 'Roboto-Light',
		color: '#ffffff',
		fontSize: 12,
		// textTransform: 'pascalcase',
	},
	textInput: {
		height: 40,
		width: '40%',
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 10,
	},
	bold: { fontWeight: 'bold' },
	italic: { fontStyle: 'italic' },
	underline: { textDecorationLine: 'underline' },
	card: {
		borderRadius: 6,
		elevation: 3,
		backgroundColor: '#fff',
		shadowOffset: { width: 2, height: 2 },
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 2,
		marginHorizontal: 4,
		marginVertical: 6,
		width: '75%',
	},
	cardContent: {
		marginHorizontal: 18,
		marginVertical: 20,
	},
})
