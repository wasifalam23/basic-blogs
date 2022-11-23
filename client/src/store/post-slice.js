import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postData: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    storePostData(state, action) {
      state.postData = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
