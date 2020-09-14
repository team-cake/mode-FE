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
	let [dailyModes, setDailyModes] = useState([])

	// const sortedModes = dailyModes.reverse((a, b) => a.id - b.id)

	async function fetchDailyModes() {
		if (user) {
			const response = await axios
				.get(`${apiUrl}/user/${user.id}`)
				.catch((err) => {
					console.log('catch err => ', err)
				})
			if (response.data.dailymodes) {
				// Getting range of date for which graph is to build
				let dailyModesFromDB = response.data.dailymodes
				console.log('dailyModesFromDB => ', dailyModesFromDB)
				let sortedArray = dailyModesFromDB.sort((a, b) => {
					if (a.createdAt < b.createdAt) {
						return 1
					} else {
						return -1
					}
				})
				console.log('sortedArray => ', sortedArray)
				setDailyModes(sortedArray)
			}
		}
	}
	// async function fetchDailyModes() {
	// 	if (user) {
	// 		const response = await axios
	// 			.get(`${apiUrl}/user/${user.id}`)
	// 			.catch((err) => {
	// 				console.log('catch err => ', err)
	// 			})
	// 		if (response.data.dailymodes) {
	// 			// Getting range of date for which graph is to build
	// 			let dailyModesFromDB = response.data.dailymodes
	// 			setDailyModes(dailyModesFromDB)
	// 		}
	// 	}
	// }
	useEffect(() => {
		fetchDailyModes()
	}, [])

	// sortedModes.sort(function(x, y) {
	// 	dailyModes.reverse((a, b) => a.id - b.id)
	// })

	const [refreshing, setRefreshing] = React.useState(false)
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		await fetchDailyModes().catch((e) => {
			console.log('async catch error: ', e)
			setRefreshing(false)
		})
		setRefreshing(false)
	}, [])

	// console.log('ProfileScreen -> sortedModes', sortedModes)

	return (
		<>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Text style={styles.small}>mode</Text>
				<Text style={styles.title}>Your Daily Modes</Text>

				{dailyModes.map((mode) => {
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
				<View style={{ height: 21 }} />
				<Text style={styles.small}>You have reached the end of your feed!</Text>
			</ScrollView>
		</>
	)
}
