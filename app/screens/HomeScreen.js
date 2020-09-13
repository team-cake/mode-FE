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
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'
import AppButton from '../Components/AppButton'
import axios from 'axios'
import { apiUrl } from '../config/constants'

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
	const navigation = useNavigation()
	const user = useSelector((state) => state.user.data)
	let [modes, setModes] = useState([0])
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
				console.log('fetchModes -> dailyModesFromDB', dailyModesFromDB)
				let dateRange = []
				for (let i = 0; i < 7; i++) {
					dateRange.push(moment().subtract(i, 'd').format('YMD'))
				}
				// Getting all mood values for the selected range
				let allModes = {}
				for (let i = 0; i < 7; i++) {
					allModes[dateRange[i]] = dailyModesFromDB.map((m) => {
						let modeDate = moment(m.createdAt).format('YMD')
						if (dateRange[i] === modeDate) {
							return m.mode
						} else {
							return 0
						}
					})
				}
				console.log('fetchModes -> allModes', allModes)
				let length = Object.size(allModes)
				for (let i = 0; i < length; i++) {
					let j = 0
					let total = allModes[dateRange[i]].reduce((total, num) => {
						j++
						return total + num
					})
					allModes[dateRange[i]] = total / j
				}
				let keysSorted = Object.keys(allModes).sort((a, b) => {
					console.log('fetchModes -> keysSorted', keysSorted)
					return allModes[a] - allModes[b]
				})
				let newArr = []
				console.log('fetchModes -> newArr', newArr)
				for (let i = 0; i < keysSorted.length; i++) {
					newArr.push(allModes[keysSorted[i]])
				}
				setModes(newArr)
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
				// [4, 2, 3, 4, 1, 2, 5],
			},
		],
	}

	const dataSec = {
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
				data: [
					Math.random() * 250,
					Math.random() * 250,
					Math.random() * 250,
					Math.random() * 250,
					Math.random() * 250,
					Math.random() * 250,
					Math.random() * 250,
				],
			},
		],
	}

	function onPress() {
		dispatch(logOut())
	}

	return (
		<>
			<View style={styles.center}>
				<ScrollView
					// contentContainerStyle={styles.scrollView}
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
					{/* <AppButton title='Day' />
					<AppButton title='Week' />
					<AppButton title='Month' /> */}
					<LineChart
						data={dataFirst}
						width={Dimensions.get('window').width}
						height={220}
						yAxisInterval={1}
						fromZero={true}
						segments={5}
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							// decimalPlaces: 2,
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
					<LineChart
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
							// decimalPlaces: 2,
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
					<Text style={styles.small}>Your lines of code per day</Text>
				</ScrollView>
			</View>
		</>
	)
}
