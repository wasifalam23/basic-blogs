import { configureStore } from '@reduxjs/toolkit';
import postSlice from './post-slice';
import authSlice from './auth-slice';
import userSlice from './user-slice';
import commentSlice from './comment-slice';

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
