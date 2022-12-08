import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCardIsOpen: false,
  showLogoutConfrimModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUserCardState(state) {
      state.userCardIsOpen = !state.userCardIsOpen;
    },

    setUserCardClose(state) {
      state.userCardIsOpen = false;
    },

    setLogoutConfirmModalState(state, action) {
      state.showLogoutConfrimModal = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
