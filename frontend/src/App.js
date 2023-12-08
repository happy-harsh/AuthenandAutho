// src/App.js
import React from 'react';

import Login from './screens/Login';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import { useSelector } from 'react-redux';
function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn)
  // console.log(isLoggedIn)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
