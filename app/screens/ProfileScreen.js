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
import Axios from 'axios'

export default function ProfileScreen() {
	const dispatch = useDispatch()
	const dailymodes = useSelector(selectDailymodes)
	const user = useSelector(selectUser)

	useEffect(() => {
		dispatch(fetchModes())
	}, [dispatch])

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
					{/* {sortModes.map((sortmode) => {
						return (
							<ModeCard
								key={sortmode.id}
								mode={sortmode.mode}
								date={moment(sortmode.createdAt).format('MMM Do YYYY')}
								image={sortmode.image}
								comment={sortmode.comment}
							>
							</ModeCard>
						)
					})} */}
				</View>
			</ScrollView>
		</>
	)
}
