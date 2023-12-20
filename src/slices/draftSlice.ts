import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	request: undefined
};

const draftSlice = createSlice({
	name: 'draft',
	initialState: initialState,
	reducers: {
		updateRequest(state, action) {
			state.request = action.payload
		}
	}
})

export const {updateRequest} = draftSlice.actions;

export default draftSlice.reducer;