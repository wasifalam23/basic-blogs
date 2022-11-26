import React, { useEffect } from 'react';
import useHttp from './hooks/http-hook';
import { useDispatch } from 'react-redux';
import { postActions } from './store/post-slice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import PostDetails from './pages/PostDetails';
import MyProfile from './pages/MyProfile';
import EditMyProfile from './pages/EditMyProfile';
import Auth from './pages/Auth';

const App = () => {
  const { sendRequest: fetchPosts } = useHttp();

  const dispatch = useDispatch();

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
        <Route path="/" element={<Posts />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="editMyProfile" element={<EditMyProfile />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
