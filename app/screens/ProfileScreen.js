import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser } from '../store/user/selector'
import {
	selectDailymodes,
	selectDailymodeUserId,
} from '../store/dailymode/selector'

import { styles } from '../styles/styles.js'
import {
	// fetchDailyModes
	fetchModes,
} from '../store/dailymode/actions'

import ModeCard from '../Components/ModeCard'
import axios from 'axios'
import { apiUrl } from '../config/constants'

export default function ProfileScreen() {
	const user = useSelector((state) => state.user.data)
	let [modes, setModes] = useState([])
	async function fetchModes() {
		if (user) {
			const response = await axios
				.get(`${apiUrl}/user/${user.id}`)
				.catch((err) => {
					console.log('catch err => ', err)
				})
			if (response.data.dailymodes) {
				// Getting range of date for which graph is to build
				let dailyModesFromDB = response.data.dailymodes
				setModes(dailyModesFromDB)
			}
		}
	}
	useEffect(() => {
		fetchModes()
	}, [])

	const [refreshing, setRefreshing] = React.useState(false)
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		await fetchModes().catch((e) => {
			console.log('async catch error: ', e)
			setRefreshing(false)
		})
		setRefreshing(false)
	}, [])

	return (
		<>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View
				// style={styles.center}
				>
					<Text style={styles.small}>mode</Text>

					<Text style={styles.title}>Your Daily Modes</Text>
					{modes.map((mode) => {
						return (
							<ModeCard
								key={mode.id}
								mode={
									mode.mode === 1
										? '🙁'
										: mode.mode === 2
										? '😕'
										: mode.mode === 3
										? '😐'
										: mode.mode === 4
										? '🙂'
										: mode.mode === 5
										? '😀'
										: ''
								}
								date={moment(mode.createdAt).format('MMM Do YYYY')}
								image={mode.image}
								comment={mode.comment}
							></ModeCard>
						)
					})}
				</View>
			</ScrollView>
		</>
	)
}
