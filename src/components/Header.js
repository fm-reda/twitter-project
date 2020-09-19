import React, { Component } from "react";
import {
  Button,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }
  // const Header = () => {
  render() {
    return (
      <>
        <Navbar className="b-twitter" variant="dark" expand="lg">
          <div className="container b-twitter ">
            <i className="fab fa-3x fa-fw fa-twitter c-white"></i>

            <Navbar.Brand href="#home">
              <Link className="nav-link c-white" to="/">
                Twitter-Feed
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto  text20">
                {/* <Link className="nav-link c-white" to="/">
                  Home
                </Link> */}

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

              {!localStorage.usertoken ? (
                <div className="row  text20">
                  <Link className="nav-link c-white" to="/signin">
                    Sign in
                  </Link>
                  <Link className="nav-link c-white" to="/signup">
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="username">
                  <NavDropdown
                    className="text-white"
                    title={localStorage.name}
                    id="nav-dropdown"
                  >
                    <div className="dp-user">
                      <NavDropdown.Item eventKey="4.1">
                        <Link to="/favoris">Favoris</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        eventKey="4.2"
                        onClick={this.logOut.bind(this)}
                      >
                        Log out
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                </div>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}
export default Header;
{
  /*               
                <div className="row  text20">
                  <a
                    href="/"
                    onClick={this.logOut.bind(this)}
                    className="nav-link text-white"
                  >
                    {localStorage.name}
                  </a>
                </div> */
}
