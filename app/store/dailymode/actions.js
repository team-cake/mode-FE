import axios from 'axios'
import { apiUrl } from '../../config/constants'

export const fetchDailyModes = () => {
	return async (dispatch, getState) => {
		const { dailymode } = getState()
		if (!dailymode.length) {
			const response = await axios.get(`${apiUrl}`)
			const dailymodes = response.data
			dispatch({ type: 'ALL_DAILYMODES', payload: dailymodes })
		}
	}
}

// export const updateHeart = (id) => {
//     return async (dispatch, getState) => {
//         const response = await Axios.patch(`${apiUrl}/artworks/${id}`)

//         console.log("succes hearts!", response.data.hearts)

//         dispatch(heartsUpdated(response.data.hearts))
//     }
// }
