const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case 'AWAITING_DAILYMODES':
			return {
				...state,
			}

		case 'ALL_DAILYMODES':
			return [...state, ...action.payload]

		default:
			return state
	}
}
