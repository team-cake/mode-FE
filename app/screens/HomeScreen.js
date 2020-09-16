import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { LineChart } from 'react-native-chart-kit'
import { styles } from '../styles/styles.js'
import {
	ScrollView,
	Text,
	View,
	Dimensions,
	RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import AppButton from '../Components/AppButton'
import axios from 'axios'
import { apiUrl } from '../config/constants'
import ModePreview from '../Components/ModePreview'

Object.size = function (obj) {
	let size = 0,
		key
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++
	}
	return size
}

export default function Home() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.data)
	let [modes, setModes] = useState([0])
	let [dailyModes, setDailyModes] = useState([])

	async function fetchModes() {
		if (user) {
			const response = await axios
				.get(`${apiUrl}/user/${user.id}`)
				.catch((err) => {
					// console.log("catch err => ", err);
				})
			if (response.data.dailymodes) {
				// Getting range of date for which graph is to build
				let dailyModesFromDB = response.data.dailymodes
				let dateRange = []
				for (let i = 0; i < 7; i++) {
					dateRange.push(moment().subtract(i, 'd').format('YMD'))
				}
				// console.log("dateRange => ", dateRange);
				// Getting all mood values for the selected range
				let allModes = {}
				for (let i = 0; i < 7; i++) {
					let n = dailyModesFromDB.map((m) => {
						let modeDate = moment(m.createdAt).format('YMD')
						if (dateRange[i] === modeDate) {
							return m.mode
						} else {
							return 0
						}
					})
					// console.log("n => ", n);
					if (n.length === 0) {
						n.push(0)
					}
					allModes[dateRange[i]] = n
				}
				// console.log("allModes => ", allModes);
				let length = Object.size(allModes)
				console.log('length of allModes => ', length)
				for (let i = 0; i < length; i++) {
					let j = 0
					let total = allModes[dateRange[i]].reduce((total, num) => {
						if (num > 0) {
							j++
						}
						return total + num
					})
					console.log(' total ', dateRange[i], ' => ', total)
					if (total === 0) {
						allModes[dateRange[i]] = 0
					} else {
						console.log('j => ', j)
						let cal = total / j
						cal = Math.round(cal)
						if (cal > 5) {
							cal = 5
						}
						allModes[dateRange[i]] = cal
					}
				}
				console.log('allModes after calculating data => ', allModes)
				let keysSorted = Object.keys(allModes).sort((a, b) => {
					return a - b
				})
				console.log('keysSorted => ', keysSorted)
				let newArr = []
				for (let i = 0; i < keysSorted.length; i++) {
					newArr.push(allModes[keysSorted[i]])
				}

				console.log('newArr => ', newArr)
				setModes(newArr)
			}
		}
	}
	// async function fetchModes() {
	// 	if (user) {
	// 		const response = await axios
	// 			.get(`${apiUrl}/user/${user.id}`)
	// 			.catch((err) => {
	// 				// console.log('catch err => ', err)
	// 			})
	// 		if (response.data.dailymodes) {
	// 			// Getting range of date for which graph is to build
	// 			let dailyModesFromDB = response.data.dailymodes
	// 			console.log('fetchModes -> dailyModesFromDB', dailyModesFromDB)
	// 			let dateRange = []
	// 			for (let i = 0; i < 7; i++) {
	// 				dateRange.push(moment().subtract(i, 'd').format('YMD'))
	// 			}
	// 			// Getting all mood values for the selected range
	// 			let allModes = {}
	// 			for (let i = 0; i < 7; i++) {
	// 				allModes[dateRange[i]] = dailyModesFromDB.map((m) => {
	// 					let modeDate = moment(m.createdAt).format('YMD')
	// 					if (dateRange[i] === modeDate) {
	// 						return m.mode
	// 					} else {
	// 						return 0
	// 					}
	// 				})
	// 			}
	// 			// console.log('fetchModes -> allModes', allModes)
	// 			let length = Object.size(allModes)
	// 			// console.log('fetchModes -> length', length)
	// 			for (let i = 0; i < length; i++) {
	// 				let j = 1
	// 				let total = allModes[dateRange[i]].reduce((total, num) => {
	// 					j++
	// 					return total + num
	// 				})
	// 				if (total === 0) {
	// 					allModes[dateRange[i]] = 0
	// 				} else {
	// 					let cal = total / j
	// 					cal = Math.ceil(cal)
	// 					if (cal > 5) {
	// 						cal = 5
	// 					}
	// 					allModes[dateRange[i]] = cal
	// 				}
	// 			}
	// 			console.log('fetchModes -> allModes', allModes)
	// 			let keysSorted = Object.keys(allModes).sort((a, b) => {
	// 				console.log('fetchModes -> keysSorted', keysSorted)
	// 				return allModes[a] - allModes[b]
	// 			})
	// 			let newArr = []
	// 			console.log('fetchModes -> newArr', newArr)
	// 			for (let i = 0; i < keysSorted.length; i++) {
	// 				newArr.push(allModes[keysSorted[i]])
	// 			}
	// 			setModes(newArr)
	// 		}
	// 	}
	// }
	useEffect(() => {
		fetchModes()
	}, [])

	// const sortedModes = dailyModes.reverse((a, b) => a.id - b.id)
	// console.log('ProfileScreen -> sortedModes', sortedModes)

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
	useEffect(() => {
		fetchDailyModes()
	}, [])

	const [refreshing, setRefreshing] = React.useState(false)
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		await fetchModes().catch((e) => {
			console.log('async catch error: ', e)
			setRefreshing(false)
		})
		await fetchDailyModes().catch((e) => {
			console.log('async catch error: ', e)
			setRefreshing(false)
		})
		setRefreshing(false)
	}, [])

	const dataFirst = {
		labels: [
			moment().subtract(6, 'd').format('MMM Do'),
			moment().subtract(5, 'd').format('MMM Do'),
			moment().subtract(4, 'd').format('MMM Do'),
			moment().subtract(3, 'd').format('MMM Do'),
			moment().subtract(2, 'd').format('MMM Do'),
			moment().subtract(1, 'd').format('MMM Do'),
			moment().format('MMM Do'),
		],
		datasets: [
			{
				data: modes,
			},
		],
	}

	// const dataSec = {
	// 	labels: [
	// 		moment().subtract(6, 'd').format('MMM Do'),
	// 		moment().subtract(5, 'd').format('MMM Do'),
	// 		moment().subtract(4, 'd').format('MMM Do'),
	// 		moment().subtract(3, 'd').format('MMM Do'),
	// 		moment().subtract(2, 'd').format('MMM Do'),
	// 		moment().subtract(1, 'd').format('MMM Do'),
	// 		moment().format('MMM Do'),
	// 	],
	// 	datasets: [
	// 		{
	// 			data: [
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 				Math.random() * 250,
	// 			],
	// 		},
	// 	],
	// }

	function onPress() {
		dispatch(logOut())
	}

	return (
		<>
			<View style={styles.center}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<Text style={styles.small}>mode</Text>
					<AppButton title='Log out' onPress={() => onPress(logOut())} />
					<Text style={styles.header}>Stats</Text>
					<Text style={styles.small}>
						Current Date: {moment().format('MMM Do YYYY')}{' '}
					</Text>
					<Text style={styles.small}>
						Current Time: {moment().format('LT')}{' '}
					</Text>
					<LineChart
						data={dataFirst}
						width={Dimensions.get('window').width}
						height={220}
						yAxisInterval={1}
						fromZero={true}
						segments={5}
						// yAxisLabel='super'
						// yAxisSuffix='ja'
						renderDotContent={({ x, y, index }) => {
							if (modes.length) {
								let n = modes[index]
								if (n === 1) {
									return (
										<Text
											style={{ position: 'absolute', left: x - 8, top: y - 10 }}
										>
											🙁
										</Text>
									)
								} else if (n === 2) {
									return (
										<Text
											style={{ position: 'absolute', left: x - 8, top: y - 10 }}
										>
											😕
										</Text>
									)
								} else if (n === 3) {
									return (
										<Text
											style={{ position: 'absolute', left: x - 8, top: y - 10 }}
										>
											😐
										</Text>
									)
								} else if (n === 4) {
									return (
										<Text
											style={{ position: 'absolute', left: x - 8, top: y - 10 }}
										>
											🙂
										</Text>
									)
								} else if (n === 5) {
									return (
										<Text
											style={{ position: 'absolute', left: x - 8, top: y - 10 }}
										>
											😀
										</Text>
									)
								}
							}
						}}
						withHorizontalLabels={true}
						withVerticalLabels={true}
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							decimalPlaces: null,
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
							propsForDots: {
								r: '6',
								strokeWidth: '2',
								stroke: '#ffffff',
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
					/>
					<Text style={styles.small}>Your mode history</Text>
					<View style={{ height: 20 }} />

					{dailyModes.map((mode) => {
						return (
							<ModePreview
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
							/>
						)
					})}
					{/* <LineChart
						data={dataSec}
						width={Dimensions.get('window').width}
						height={220}
						yAxisInterval={1}
						fromZero={true}
						segments={5}
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							decimalPlaces: null,
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
							propsForDots: {
								r: '6',
								strokeWidth: '2',
								stroke: '#ffffff',
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
					/>
					<Text style={styles.small}>Your lines of code per day</Text> */}
				</ScrollView>
			</View>
		</>
	)
}
