import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./reposSlice";
import paginationSlice from "./paginationSlice";

const store = configureStore({
  reducer: {
    repos: reposReducer,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
