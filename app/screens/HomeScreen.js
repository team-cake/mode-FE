import React, { useState, useEffect } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { styles } from '../styles/styles.js'
import {
	Button,
	FlatList,
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user/actions'
import { selectToken, selectUser } from '../store/user/selector'

export default function Home() {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const token = useSelector(selectToken)
	const user = useSelector(selectUser)

	const dataFirst = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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

	function onPress(email, password) {
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
					<Image source={require('../assets/mode_logo.png')} />
					<Button title='LogOut' onPress={() => onPress(logOut())} />
					<Text style={styles.header}>home</Text>
					<Button width='10%' title='Day' />
					<Button title='Week' />
					<Button title='Month' />
					<LineChart
						data={dataFirst}
						width={Dimensions.get('window').width} // from react-native
						height={220}
						yAxisLabel='$'
						yAxisSuffix='k'
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							decimalPlaces: 2, // optional, defaults to 2dp
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
					<LineChart
						data={dataSec}
						width={Dimensions.get('window').width} // from react-native
						height={220}
						yAxisLabel='$'
						yAxisSuffix='k'
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{
							backgroundColor: '#000000',
							backgroundGradientFrom: '#1E2923',
							backgroundGradientTo: '#08130D',
							decimalPlaces: 2, // optional, defaults to 2dp
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
					<Image source={require('../assets/mode_logo.png')} />
				</ScrollView>
			</View>
		</>
	)
}
