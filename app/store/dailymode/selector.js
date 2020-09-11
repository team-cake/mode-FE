export const selectDailymodes = (reduxState) => {
	return reduxState.dailymode
}

export const selectDailymodeUserId = (reduxState) => {
	return reduxState.dailymode.userId
}
