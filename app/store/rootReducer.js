import { combineReducers } from 'redux'
import appState from './appState/reducer'
import user from './user/reducer'
import dailymode from './dailymode/reducer'

export default combineReducers({
	appState,
	user,
	dailymode,
})
