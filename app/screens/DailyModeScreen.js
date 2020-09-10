import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, View, Icon } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { postDailyMode } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'
import { Entypo, Fontisto } from '@expo/vector-icons'

import { styles } from '../styles/styles.js'

export default function DailyMode() {
	const [mode, setMode] = useState('')
	const [comment, setComment] = useState('')
	const [image, setImage] = useState('')
	const [loading, setLoading] = useState('')
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	console.log('DailyMode -> token', token)

	const user = useSelector(selectUser)
	console.log('DailyMode -> user', user)

	const navigation = useNavigation()

	function onPress(mode, comment, image, userId) {
		dispatch(postDailyMode(mode, comment, image, userId))
		setMode('')
		setComment('')
		setImage('')
	}

	// useEffect(() => {
	// 	if (token !== null) {
	// 		navigation.navigate('Home')
	// 	}
	// }, [token, navigation])

	return (
		<>
			<View style={styles.center}>
				{/* <Text style={styles.header}>What is your mode today?</Text> */}
				<Fontisto name='frowning' size={24} color='black' />
				<Fontisto name='confused' size={24} color='black' />
				<Fontisto name='neutral' size={24} color='black' />
				<Fontisto name='slightly-smile' size={24} color='black' />
				<Fontisto name='smiley' size={24} color='black' />
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => setMode(text)}
					value={mode}
					keyboardType='number-pad'
					placeholder='mode 1 - 5'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => setComment(text)}
					value={comment}
					keyboardType='default'
					placeholder='Comment'
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text) => setImage(text)}
					value={image}
					keyboardType='default'
					placeholder='Image'
				/>
				<Button
					title='Add mode'
					onPress={() => onPress(mode, comment, image)}
				/>
			</View>
		</>
	)
}
