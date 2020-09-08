import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 36,
		marginBottom: 16,
		textAlign: 'center',
	},
	header: {
		fontSize: 25,
		marginBottom: 16,
		textAlign: 'center',
	},
	androidButtonText: {
		color: 'blue',
		fontSize: 20,
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
})
