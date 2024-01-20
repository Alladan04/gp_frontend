import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import draftReducer from "./draftSlice";
import operationReducer from "./operationSlice";
import filtersReducer from "./filterSlice"
export default configureStore({
  reducer: {
    user: authReducer,
    draft: draftReducer,
    operation: operationReducer,
    filters: filtersReducer
}});