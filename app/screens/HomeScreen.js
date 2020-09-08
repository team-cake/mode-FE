import React, { useState, useEffect } from 'react'
import { styles } from '../styles/styles.js'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
	const navigation = useNavigation()

	return (
		<>
			<View style={styles.center}>
				<Text style={styles.title}>home</Text>
				<Text
					title='Daily Mode'
					style={styles.underline}
					onPress={() => navigation.navigate('DailyMode')}
				>
					dailymode
				</Text>
			</View>
		</>
	)
}
