import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	request: undefined,
	//items: undefined
};
//request contains request with request information( data, status etc)
//request also contains items which is a list of objects, which contain operation and additional info (operands, result)
const draftSlice = createSlice({
	name: 'draft',
	initialState: initialState,
	reducers: {
		updateRequest(state, action) {
		
			state.request = action.payload
			//state.items = action.payload.data.items
		},
		/*updateOpReq(state :{request:DraftRequest;}, action:{payload: any;type: string;}, id:number){
			for (var item of state.request.items){
				if (item.id == id){
					item.operand1 = action.payload.operand1
					item.operand2 = action.payload.operand2
				}
			}
		}*/
	}
})

export const {updateRequest} = draftSlice.actions;

export default draftSlice.reducer;