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

// import { apiUrl } from '../config/constants'
// import { emojis } from '../assets/modes'

import ModeCard from '../Components/ModeCard'
// import Axios from 'axios'

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout)
	})
}

export default function ProfileScreen() {
	const dispatch = useDispatch()
	const dailymodes = useSelector(selectDailymodes)
	const user = useSelector(selectUser)
	const dms = user.dailymodes
	// console.log('ProfileScreen -> user', user.dailymodes)
	// console.log('ProfileScreen -> dailymodes', dailymodes)

	useEffect(() => {
		dispatch(fetchModes())
	}, [dispatch])

	// const [dailyMode, setDailyMode] = useState('')
	// const fetchModes = async () => {
	// 	const modes = await Axios.get(`${apiUrl}/user/${user.id}/dailymode`)
	// 	console.log('fetchModes -> modes', modes.data.dailymodes)
	// 	setDailyMode(modes.data.dailymodes)
	// }
	// useEffect(() => {
	// 	fetchModes()
	// }, [])

	const sortModes = dms.sort((a, b) => a.createdAt - b.createdAt)

	const [refreshing, setRefreshing] = React.useState(false)

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)

		wait(2000).then(() => setRefreshing(false))
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
					{sortModes.map((sortmode) => {
						return (
							<ModeCard
								key={sortmode.id}
								mode={sortmode.mode}
								date={moment(sortmode.createdAt).format('MMM Do YYYY')}
								image={sortmode.image}
								comment={sortmode.comment}
							>
								{/* <Text
									style={[
										styles.emoji,
										emojis.id.toString() === sortModes.mode.toString() &&
											styles.emojiSelected,
									]}
								>
									{e.val}
								</Text> */}
								{/* mode={sortmode.mode === emojis.id.toString()} */}
							</ModeCard>
						)
					})}
				</View>
			</ScrollView>
		</>
	)
}
