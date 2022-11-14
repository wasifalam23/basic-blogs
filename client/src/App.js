import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AddPost from './pages/AddPost';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
