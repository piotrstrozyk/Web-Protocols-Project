//import LoginForm from "./LoginForm";
//import RegistrationForm from "./RegistrationForm";
import Sidebar from './Sidebar';
//import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Nav, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SidebarRight from './SidebarRight';
import { Navbar } from 'react-bootstrap';
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import Logout from './Logout';
import { useNavigate } from "react-router-dom";
import Chat from './Chat';

function MainPage() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // Ustaw adres serwera WebSocket

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
      setWs(socket);
    });

    socket.addEventListener('message', (event) => {
      console.log(`Received message from server: ${event.data}`);
      // Tutaj możesz przetwarzać otrzymane komunikaty od serwera WebSocket
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      // Tutaj możesz obsługiwać zdarzenie zamknięcia połączenia
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send('Hello, EMQ X!');
    }
  };

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