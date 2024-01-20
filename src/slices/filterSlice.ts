import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
  startDate: string,
  endDate: string,
  Status: any,
  userName: string,
  title: string;
}

const initialState: FiltersState = {
  startDate: "",
  endDate: "",
  Status: "",
  userName: "",
  title: ""
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters(state, action: PayloadAction<FiltersState>) {
      // PayloadAction используется для строгой типизации 'action.payload'
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
      state.Status = action.payload.Status
      state.userName = action.payload.userName
      // Использование Immer позволяет "мутировать" состояние напрямую
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  }
});

export const { updateFilters, updateTitle } = filtersSlice.actions;

export default filtersSlice.reducer;