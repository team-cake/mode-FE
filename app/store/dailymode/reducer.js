const initialState = {
	mode: null,
	comment: null,
	image: null,
	createdAt: null,
}

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
