import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import SignUp from '../pages/sign-up';

export default function Router() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  )
}
