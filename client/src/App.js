import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import PostDetails from './pages/PostDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/postDetails" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
