import React, { useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser } from '../store/user/selector'
import { selectDailymodes } from '../store/dailymode/selector'

import { styles } from '../styles/styles.js'
import { fetchDailyModes } from '../store/dailymode/actions'

import ModeCard from '../Components/ModeCard'

export default function ProfileScreen() {
	const dispatch = useDispatch()

	const token = useSelector(selectToken)
	// console.log('ProfileScreen -> token', token)
	const dailyModes = useSelector(selectDailymodes)
	const user = useSelector(selectUser)

	const userDailymodes = dailyModes.filter((dailymode) => {
		if (dailymode.userId === user.id) {
			return true
		} else {
			return false
		}
	})

	useEffect(() => {
		dispatch(fetchDailyModes())
	}, [dispatch])

	return (
		<>
			<ScrollView>
				<View style={styles.center}>
					<Text style={styles.title}>Profile</Text>
					<ModeCard />
				</View>
			</ScrollView>
		</>
	)
}
