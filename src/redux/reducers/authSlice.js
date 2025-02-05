import { createSlice } from '@reduxjs/toolkit';




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Data pengguna yang sedang login
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      
      state.loading = false;
      state.user = action.payload;
      console.log("payload", state.user);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
