import axios from 'axios'
import { apiUrl } from '../../config/constants'
import { selectUser } from '../user/selector'

// export const fetchDailyModes = () => {
// 	console.log('do i get here')
// 	return async (dispatch, getState) => {
// 		const user = selectUser(getState())
// 		const id = user.id
// 		console.log('fetchDailyModes -> id', id)
// 		console.log('fetchDailyModes -> user', user)

// 		console.log('do i get here too as well or not')
// 		try {
// 			const response = await axios.get(`${apiUrl}/user/dailymode/${id}`)
// 			// const response = await axios.get(`${apiUrl}/user/${userId}dailymode`)
// 			const modes = response
// 			console.log('fetchDailyModes -> modes', modes)

// 			// const mode = await modes.findByPk(userId)
// 			// console.log('fetchDailyModes -> mode', mode)

// 			dispatch({ type: 'ALL_DAILYMODES', payload: modes })
// 		} catch (error) {
// 			console.log(error.message)
// 		}
// 	}
// }

export const fetchModes = () => {
	return async (dispatch, getState) => {
		const { dailymode } = getState()
		if (!dailymode.length) {
			const response = await axios.get(`${apiUrl}/dailymode`)
			const dailymodes = response.data
			dispatch({ type: 'ALL_DAILYMODES', payload: dailymodes })
		}
	}
}
