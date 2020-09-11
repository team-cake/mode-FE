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

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout)
	})
}

export default function Home() {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const token = useSelector(selectToken)
	const user = useSelector(selectUser)
	console.log('Home -> user', user)
	const dailymodes = user.dailymodes
	console.log('Home -> dailymodes', dailymodes)

	const mood = dailymodes.map((dailymode) => dailymode.mode)
	console.log('Home -> mood', mood)

	const [refreshing, setRefreshing] = React.useState(false)
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)

		wait(2000).then(() => setRefreshing(false))
	}, [])

	const [chartData, setChartData] = useState({})

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
				data: [
					// mood[1],
					// mood[2],
					// mood[3],
					// mood[4],
					// mood[5],
					// mood[6],
					// mood[7],
					4,
					2,
					3,
					4,
					1,
					4,
					5,
				],
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

	useEffect(() => {
		if (token === null) {
			navigation.navigate('Login')
		}
	}, [token, navigation])

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
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							decimalPlaces: 2,
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
