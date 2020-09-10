import axios from 'axios'
import { apiUrl } from '../../config/constants'

export const fetchDailyModes = () => {
	console.log('do i get here')
	return async (dispatch, getState) => {
		// const { user } = getState()
		// const userId = user.id
		// console.log('fetchDailyModes -> userId', userId)

		// const { dailymode } = getState()
		console.log('do i get here too')
		// if (!dailymode.length) {
		const response = await axios.get(`${apiUrl}/dailymode`)
		// const response = await axios.get(`${apiUrl}/user/${userId}dailymode`)
		const modes = response.data.rows
		console.log('fetchDailyModes -> modes', modes)

		// const mode = await modes.findByPk(userId)
		// console.log('fetchDailyModes -> mode', mode)

		dispatch({ type: 'ALL_DAILYMODES', payload: modes })
		// }
	}
}

// export const updateHeart = (id) => {
//     return async (dispatch, getState) => {
//         const response = await Axios.patch(`${apiUrl}/artworks/${id}`)

//         console.log("succes hearts!", response.data.hearts)

//         dispatch(heartsUpdated(response.data.hearts))
//     }
// }
