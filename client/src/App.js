import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import PostDetails from './pages/PostDetails';
import MyProfile from './pages/MyProfile';
import EditMyProfile from './pages/EditMyProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/postDetails" element={<PostDetails />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="editMyProfile" element={<EditMyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
