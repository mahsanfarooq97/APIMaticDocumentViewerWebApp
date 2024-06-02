import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "../slice";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    pageSlice: pageSlice,
  },
});

export { store };
 