import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      localStorage.setItem('token', token);
      if (token) state.isLoggedIn = true;
    },

    logout(state) {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },

    stayLoggedIn(state) {
      const token = localStorage.getItem('token');
      state.isLoggedIn = token ? true : false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
