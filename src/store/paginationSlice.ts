import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  rowsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  rowsPerPage: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setCurrentPage, setRowsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
