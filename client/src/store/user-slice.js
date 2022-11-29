import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData(state, action) {
      const data = action.payload;
      state.userData = data;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
