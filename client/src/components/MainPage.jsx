//import LoginForm from "./LoginForm";
//import RegistrationForm from "./RegistrationForm";
import Sidebar from './Sidebar';
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MainPage() {
  const divsArray = Array.from({ length: 5 }, (value, index) => (
    <div key={index} className="custom-div">
      Div {index + 1}
    </div>
  ));
  return (
    <>
    <Sidebar>
    {divsArray}
    </Sidebar>
    </>
  );
}

export default MainPage;