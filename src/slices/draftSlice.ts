import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	request: undefined,
	//items: undefined
};

const draftSlice = createSlice({
	name: 'draft',
	initialState: initialState,
	reducers: {
		updateRequest(state, action) {
		
			state.request = action.payload
			//state.items = action.payload.data.items
		}
	}
})

export const {updateRequest} = draftSlice.actions;

export default draftSlice.reducer;