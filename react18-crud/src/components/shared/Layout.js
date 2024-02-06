import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from 'react-bootstrap/Spinner';
// import { NavDropdown } from "react-bootstrap";
 
function Layout(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 5000); // 5000 milliseconds (5 seconds)
    
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    
      }, []);

  return (
    <div>
        <div style={{ position: 'relative' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner animation="grow" variant="dark" />
        </div>
      )}
      </div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="http://localhost:3000/"><h2>TV Shows</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/yuvraj96k/">Contact</Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/yuvraj96k/">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="https://www.linkedin.com/in/yuvraj96k/">
              Linkedin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{props.children}</Container>
    </div>
  );
}
 
export default Layout;