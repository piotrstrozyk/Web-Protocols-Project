import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{width: '100px'}} variant="outline-light" onClick={handleShow}>
        End
      </Button>
      <Offcanvas style={{backgroundColor: '#1e1f22', color: 'white'}} show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
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