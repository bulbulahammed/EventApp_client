import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  token: string | null;
  user: {
    email: string | null;
    id: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

// Check if window is defined to ensure we are on the client-side
const isClient = typeof window !== "undefined";

const storedToken = isClient ? localStorage.getItem("token") : null;
const storedEmail = isClient ? localStorage.getItem("email") : null;
const storedId = isClient ? localStorage.getItem("id") : null;

const initialState: IAuthState = {
  token: storedToken !== null ? storedToken : null,
  user: {
    email: storedEmail !== null ? storedEmail : null,
    id: storedId !== null ? storedId : null
  },
  isLoading: false,
  isError: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          email: string;
          id: string;
        };
      }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.user.email !== null) {
        state.user.email = action.payload.user.email;
      }
      if (action.payload.user.id !== null) {
        state.user.id = action.payload.user.id;
      }
    },
    defaultState: (state) => {
      state.token = null;
      state.user.email = null;
      state.user.id = null;
    }
  }
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
