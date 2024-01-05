import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col } from "react-bootstrap";

// function Header() {
//   const navigate = useNavigate();

//   function handleLogout() {
//     // Add your logout logic here
//     // For example, you can clear user session and navigate to the login page
//     navigate(`/`);
//   }

//   return (
//     <>
//       <Navbar bg="light" data-bs-theme="light">
//         <Container>
//           <Navbar.Brand>TaskBuddy</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="">Home</Nav.Link>
//             <Nav.Link href="">Features</Nav.Link>
//             <Nav.Link href="">Pricing</Nav.Link>
//           </Nav>
//           <div className="d-flex align-items-center">
//             <Navbar.Brand>Welcome Back!</Navbar.Brand>
//           </div>
//           <Nav>
//             <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
//               Logout
//             </Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default Header;

// import React from 'react';

function Header() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchName() {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("jsonData:", jsonData);
        setName(jsonData.first_name); 
      } catch (err) {
        console.error(err.message);
        // Handle error, e.g., set an error state
      }
    }

    fetchName();
  }, [userId]);

  function handleLogout() {
    // Add your logout logic here
    // For example, you can clear the user session and navigate to the login page
    navigate(`/`);
  }

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Row className="w-100">
          <Col className="d-flex align-items-center">
            <Navbar.Brand>TaskBuddy</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="">Features</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link>
            </Nav>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Navbar.Brand>Welcome Back {name}!</Navbar.Brand>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Nav>
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;