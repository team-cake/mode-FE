import React, { useState } from 'react'
import {
	Button,
	SafeAreaView,
	StatusBar,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { emojis } from '../assets/modes'
import { styles } from '../styles/styles.js'

import axios from 'axios'
import { apiUrl } from '../config/constants'

export default function DailyMode() {
	const [emoji, setEmoji] = useState('1')
	const [comment, setComment] = useState('')
	const [image, setImage] = useState('')
	const [loading, setLoading] = useState(false)

	const user = useSelector((state) => state.user.data)

	const navigation = useNavigation()

	async function onPressSend(mode, comment, image, userId) {
		setLoading(true)
		await axios
			.post(`${apiUrl}/dailymode`, {
				mode,
				comment,
				image,
				userId,
			})
			.catch((e) => {
				setLoading(false)
				console.log('Error: ', e)
			})
		setLoading(false)
		setComment('')
		setImage('')
		navigation.navigate('Stats')
	}

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar />
				<Text style={styles.small}>mode</Text>

				<View style={styles.container}>
					<Text style={styles.header}>What is your mode today?</Text>

					<View style={styles.formContainer}>
						<View style={styles.emojiContainer}>
							{emojis.map((e) => {
								return (
									<TouchableOpacity
										key={e.id}
										onPress={() => {
											setEmoji(e.id)
										}}
										style={styles.emojiTouchable}
									>
										<Text
											style={[
												styles.emoji,
												e.id.toString() === emoji.toString() &&
													styles.emojiSelected,
											]}
										>
											{e.val}
										</Text>
									</TouchableOpacity>
								)
							})}
						</View>
						<View>
							<TextInput
								style={styles.textInputComment}
								placeholder={'Comment'}
								value={comment}
								multiLine
								onChangeText={(text) => {
									setComment(text)
								}}
							/>
							<View style={{ height: 21 }} />
							<TextInput
								style={styles.textInput}
								placeholder={'Image URL'}
								value={image}
								keyboardType='url'
								onChangeText={(text) => {
									setImage(text)
									console.log('')
								}}
							/>
						</View>
						<View style={{ height: 50 }} />
						<Button
							title={loading ? 'Sending your mode...' : 'Add Mode'}
							onPress={async () => {
								await onPressSend(emoji, comment, image, user.id)
							}}
						/>
					</View>
				</View>
			</SafeAreaView>
		</>
	)
}
