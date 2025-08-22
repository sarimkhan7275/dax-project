import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import SignUp from '../pages/sign-up';
import Home from '../pages/home';

export default function Router() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  )
}
