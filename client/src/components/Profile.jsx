import { useEffect, useState } from "react";
//import LoginForm from "./LoginForm";
//import RegistrationForm from "./RegistrationForm";
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';

function MainPage() {
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const loggedIn = localStorage.getItem("authenticated");
        if (loggedIn) {
            setAuthenticated(loggedIn);
        }
    }, []);
  return (
    <div className="App">
      "oh hi"
    </div>

  );
}

export default MainPage;