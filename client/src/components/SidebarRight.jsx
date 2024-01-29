import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:3000/allusers');
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
        Users
      </Button>

      <Offcanvas placement='end' style={{backgroundColor: '#1e1f22', color: 'white'}} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div>
        {users.map((channel, index) => (
           <Button variant="outline-info" key={index}>{channel.nick}</Button>
        ))}</div>
      
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function SidebarRight() {
  return (
    <>
        <OffCanvasExample placement={'end'} name={'end'} />

    </>
  );
}

export default SidebarRight