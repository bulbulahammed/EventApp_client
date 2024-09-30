import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authSlice from "./features/user/authSlice";

// Configure and export the store directly
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production"
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
