import { configureStore } from '@reduxjs/toolkit';
import postSlice from './post-slice';
import authSlice from './auth-slice';
import userSlice from './user-slice';

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
