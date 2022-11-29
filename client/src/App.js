import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postActions } from './store/post-slice';

import useHttp from './hooks/http-hook';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import PostDetails from './pages/PostDetails';
import MyProfile from './pages/MyProfile';
import EditMyProfile from './pages/EditMyProfile';
import Auth from './pages/Auth';
import { authActions } from './store/auth-slice';

const App = () => {
  const { sendRequest: fetchPosts } = useHttp();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.stayLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    const receivedPostData = (data) => {
      dispatch(postActions.storePostData(data.data.blogs));
    };

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/blogs',
    };

    fetchPosts(reqConfig, receivedPostData);
  }, [fetchPosts, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {isLoggedIn && <Route path="/" element={<Posts />} />}
        {isLoggedIn && <Route path="/addPost" element={<AddPost />} />}
        {isLoggedIn && (
          <Route path="/postDetails/:id" element={<PostDetails />} />
        )}
        {isLoggedIn && <Route path="/myProfile" element={<MyProfile />} />}
        {isLoggedIn && (
          <Route path="editMyProfile" element={<EditMyProfile />} />
        )}
        {!isLoggedIn && <Route path="*" element={<Auth />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
