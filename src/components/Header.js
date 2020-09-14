import React from "react";
import {
  Button,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar className="b-twitter" variant="dark" expand="lg">
        <div className="container b-twitter ">
          <i className="fab fa-3x fa-fw fa-twitter c-white"></i>

          <Navbar.Brand href="#home">Twitter-Feed</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto  text20">
              <Link className="nav-link c-white" to="/">
                Home
              </Link>

              <Link className="nav-link c-white" to="/live">
                live
              </Link>
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <div className="row  text20">
              <Link className="nav-link c-white" to="/signin">
                Sign in
              </Link>
              <Link className="nav-link c-white" to="/signup">
                Sign up
              </Link>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};
export default Header;
