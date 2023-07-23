import { configureStore } from "@reduxjs/toolkit";
import actionCombined from "./src/redux/reducers/actionCombined";

const store = configureStore({
  reducer: {
    actionCombined,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
