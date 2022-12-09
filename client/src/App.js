import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from './store/post-slice';
import { userActions } from './store/user-slice';
import { authActions } from './store/auth-slice';

import useHttp from './hooks/http-hook';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';
import EditMyProfile from './pages/EditMyProfile';
import Auth from './pages/Auth';
import MyPosts from './pages/MyPosts';

const App = () => {
  const { sendRequest: fetchPosts } = useHttp();
  const { sendRequest: getCurrentUser } = useHttp();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const postChanged = useSelector((state) => state.post.postChanged);
  const userChanged = useSelector((state) => state.user.userChanged);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(authActions.stayLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    const loggedInUserData = (data) => {
      if (data.status === 'success') {
        dispatch(userActions.storeUserData(data.data.user));
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/users/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    getCurrentUser(reqConfig, loggedInUserData);
  }, [getCurrentUser, dispatch, token, userChanged]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const receivedPostData = (data) => {
      dispatch(postActions.storePostData(data.data.blogs));
    };

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/blogs',
    };

    fetchPosts(reqConfig, receivedPostData);
  }, [fetchPosts, dispatch, postChanged, isLoggedIn]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {isLoggedIn && <Route path="/" element={<Posts />} />}
        {isLoggedIn && <Route path="/addPost" element={<AddPost />} />}
        {isLoggedIn && <Route path="/editPost/:id" element={<EditPost />} />}
        {isLoggedIn && (
          <Route path="/postDetails/:id" element={<PostDetails />} />
        )}
        {isLoggedIn && <Route path="/myPosts/:id" element={<MyPosts />} />}
        {isLoggedIn && (
          <Route path="editMyProfile" element={<EditMyProfile />} />
        )}
        {/* {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )} */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
