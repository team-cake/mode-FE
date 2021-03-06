import { apiUrl } from '../../config/constants'
import axios from 'axios'
import { selectToken, selectUser } from './selector'
import {
	appLoading,
	appDoneLoading,
	showMessageWithTimeout,
	setMessage,
} from '../appState/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const TOKEN_STILL_VALID = 'TOKEN_STILL_VALID'
export const LOG_OUT = 'LOG_OUT'

export const loginSuccess = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload,
	}
}

const tokenStillValid = (userWithoutToken) => ({
	type: TOKEN_STILL_VALID,
	payload: userWithoutToken,
})

export const logOut = () => ({ type: LOG_OUT })

export const signUp = (
	firstName,
	lastName,
	email,
	password,
	dateOfBirth,
	githubLink
) => {
	return async (dispatch, getState) => {
		// console.log('do i get here')
		try {
			const response = await axios.post(`${apiUrl}/signup`, {
				firstName,
				lastName,
				email,
				password,
				dateOfBirth,
				githubLink,
			})
			// console.log('do i get here too')
			dispatch(loginSuccess(response.data))
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
				dispatch(setMessage('danger', true, error.response.data.message))
			} else {
				console.log(error.message)
				dispatch(setMessage('danger', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const login = (email, password) => {
	return async (dispatch, getState) => {
		// console.log('do i get here')
		try {
			const response = await axios.post(`${apiUrl}/login`, {
				email,
				password,
			})
			// console.log('do i get here too', response.data)
			dispatch(loginSuccess(response.data))
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
			} else {
				console.log(error.message)
			}
		}
	}
}

export const getUserWithStoredToken = () => {
	return async (dispatch, getState) => {
		// get token from the state
		const token = selectToken(getState())

		// if we have no token, stop
		if (token === null) return

		dispatch(appLoading())
		try {
			// if we do have a token,
			// check wether it is still valid or if it is expired
			const response = await axios.get(`${apiUrl}/me`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			// token is still valid
			dispatch(tokenStillValid(response.data))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.message)
			} else {
				console.log(error)
			}
			// if we get a 4xx or 5xx response,
			// get rid of the token by logging out
			dispatch(logOut())
			dispatch(appDoneLoading())
		}
	}
}

export const postDailyMode = (mode, comment, image, userId) => {
	return async (dispatch, getState) => {
		const user = selectUser(getState())
		console.log('postDailyMode -> user', user)
		const id = user.id
		const token = user.token
		try {
			const response = await axios.post(
				`${apiUrl}/dailymode/`,
				{
					mode: mode,
					comment: comment,
					image: image,
					userId: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			console.log('postDailyMode -> response', response)

			dispatch(
				showMessageWithTimeout(
					'success',
					false,
					'Dailymode successfully added',
					90000
				)
			)
		} catch (error) {
			console.log(error.message)
		}
	}
}
