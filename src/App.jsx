import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Chat from './Components/Chat';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
  );
};

export default App;
