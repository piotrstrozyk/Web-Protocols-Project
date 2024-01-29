import { useState } from "react";
import LoginPage from "./components/LoginPage";
import RegistrationForm from "./components/RegistrationForm";
import MainPage from "./components/MainPage";
import { Routes, Route, useLocation, Link, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import AddChannel from './components/AddChannel'
import Profile from "./components/Profile";
import SearchUsers from "./components/SearchUsers";
import FreeForum from "./components/FreeForum";

function App() {
  return (
    <div style={{backgroundColor: '#1e1f22', height: '100%'}}>  
    <Routes>
    <Route path="/search" element={<SearchUsers />} />
    <Route path='/' element={<MainPage/>}/>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/addchannel' element={<AddChannel/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/forum' element={<FreeForum/>}/>
    </Routes>
  </div>
  );
}

export default App;
