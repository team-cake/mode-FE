import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import { styles } from '../styles/styles.js'

export default function Home() {
	return (
		<>
			<View style={styles.center}>
				<Text style={styles.title}>home</Text>
			</View>
		</>
	)
}