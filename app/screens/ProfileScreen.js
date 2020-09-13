import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'

import { styles } from '../styles/styles.js'

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

	const sortedModes = modes.reverse((a, b) => a.id - b.id)
	console.log('ProfileScreen -> sortedModes', sortedModes)

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
				<Text style={styles.small}>mode</Text>
				<Text style={styles.title}>Your Daily Modes</Text>
				{sortedModes.map((mode) => {
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
				<Text style={styles.small}>You have reached the end of your feed!</Text>
			</ScrollView>
		</>
	)
}
