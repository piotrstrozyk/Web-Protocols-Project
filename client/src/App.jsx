import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MainPage from "./components/MainPage";
import { Routes, Route, useLocation, Link, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>  
    <Routes>
    <Route path='/' element={<MainPage/>}/>
    </Routes>
  </div>
  );
}

export default App;
