//import LoginForm from "./LoginForm";
//import RegistrationForm from "./RegistrationForm";
import Sidebar from './Sidebar';
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Nav, Link } from 'react-router-dom';
import React, { useState } from 'react';
import SidebarRight from './SidebarRight';
import { Navbar } from 'react-bootstrap';
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import Logout from './Logout';
import { useNavigate } from "react-router-dom";
import Chat from './Chat';

function MainPage() {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };
  let navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  return (
    <>
    <NavBar />
    <Button style={{width: '100px', marginLeft: '50px'}} type='submit' onClick={routeChange} variant="primary">Login</Button>
    <Logout />
   <Sidebar onSelectChannel={handleChannelSelect} />
   <div className="main">
        {selectedChannel ? (
          <Chat selectedChannel={selectedChannel} />
        ) : (
          <p>Please select a channel from the sidebar.</p>
        )}
      </div>
   <SidebarRight />
    </>
  );
}

export default MainPage;