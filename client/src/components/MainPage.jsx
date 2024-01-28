//import LoginForm from "./LoginForm";
//import RegistrationForm from "./RegistrationForm";
import Sidebar from './Sidebar';
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SidebarRight from './SidebarRight';
import Header from './Header';

function MainPage() {
  
  return (
    <>
    <Header />
    <Sidebar />
    <SidebarRight />
    </>
  );
}

export default MainPage;