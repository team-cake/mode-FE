import React, { useState, useEffect } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { styles } from '../styles/styles.js'
import { Button, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
	const navigation = useNavigation()

	const data = {
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

	return (
		<>
			<View style={styles.center}>
				<Text style={styles.header}>home</Text>

				<LineChart
					data={data}
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

				<Text
					title='Daily Mode'
					style={styles.underline}
					onPress={() => navigation.navigate('DailyMode')}
				>
					dailymode
				</Text>
			</View>
		</>
	)
}
