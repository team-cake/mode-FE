import React, { useEffect } from 'react'
import moment from 'moment'
import { LineChart } from 'react-native-chart-kit'
import { styles } from '../styles/styles.js'
import { ScrollView, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'
import AppButton from '../Components/AppButton'

export default function Home() {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const token = useSelector(selectToken)
	const user = useSelector(selectUser)
	console.log('Home -> user', user)

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
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
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
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
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
				<ScrollView>
					<Text style={styles.small}>mode</Text>
					<AppButton title='Log out' onPress={() => onPress(logOut())} />
					<Text style={styles.header}>Stats</Text>
					<Text style={styles.small}>
						Current Date: {moment().format('MMM Do YYYY')}{' '}
					</Text>
					<Text style={styles.small}>
						Current Time: {moment().format('LTS')} 7 days ago{' '}
					</Text>
					<AppButton title='Day' />
					<AppButton title='Week' />
					<AppButton title='Month' />
					<LineChart
						data={dataFirst}
						width={Dimensions.get('window').width}
						height={220}
						yAxisLabel='$'
						yAxisSuffix='k'
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
						yAxisLabel='$'
						yAxisSuffix='k'
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
					<Text style={styles.small}>Your code history</Text>
				</ScrollView>
			</View>
		</>
	)
}
