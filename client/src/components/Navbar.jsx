import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Switch, ROute, Link } from "react-router-dom";

function ColorSchemesExample() {
  return (
    <>
      <Navbar style={{paddingLeft: '40%'}} bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Main Page</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="addchannel">Add Channel</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/forum">General</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;