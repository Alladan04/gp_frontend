import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    operation: undefined,
};

const operationSlice = createSlice({
    name: 'operation',
    initialState: initialState,
    reducers: {
        updateOperation(state, action) {
            state.operation = action.payload
        }
    }
})

export const {updateOperation} = operationSlice.actions;

export default operationSlice.reducer;