import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

function Sidebar({ onSelectChannel }) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:3000/allchannels');
        setUsers(response.data);
      } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Button style={{width: '100px', marginRight: '600px'}} variant="outline-light" onClick={handleShow}>
        Channels
      </Button>

      <Offcanvas style={{backgroundColor: '#1e1f22', color: 'white'}} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Channels</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div>
        {users.map((channel, index) => (
           <Button key={index} onClick={() => onSelectChannel(channel.title)}>{channel.title}</Button>
        ))}</div>
      
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;