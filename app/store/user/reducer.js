import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from './actions'
import { AsyncStorage } from 'react-native'

const initialState = {
	token: AsyncStorage.getItem('token'),
	firstName: null,
	email: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			AsyncStorage.setItem('token', action.payload.token)
			return { ...state, ...action.payload }

		case LOG_OUT:
			AsyncStorage.removeItem('token')
			return { ...initialState, token: null }

		case TOKEN_STILL_VALID:
			return { ...state, ...action.payload }

		default:
			return state
	}
}
