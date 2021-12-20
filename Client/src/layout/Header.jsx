import { Navbar, Nav, Form } from "react-bootstrap";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
} from "mdbreact";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { signout } from "../Authentication/UserActions";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import { signinUserSuccess } from "../Authentication/UserReducer";
import { isAdmin } from "../routing/helper";

const Header = ({ loggedin, email }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt(token);
      var dateNow = new Date();

      if (user.exp * 1000 <= dateNow.getTime()) {
        signOut();
      } else {
        dispatch(signinUserSuccess(user.email));
      }
    }
  });
  const signOut = () => {
    dispatch(signout());
  };

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand href="/">
        <img className="logo" src="/logo.png" alt="MyUniShopLogo" />
        <p className="text-muted small mt-3">
          <i>
            <strong>Fulda University Software Engineering Fall 2020.</strong>
          </i>
        </p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>

        {!loggedin ? (
          <Form inline>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/signin">Sign In</Nav.Link>
          </Form>
        ) : (
          <>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <Link to="/products" className="dropdown-item">
                  Post an Ad
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                {isAdmin() ? (
                  <Link to="/admin/pending" className="dropdown-item">
                    Admin Dashboard
                  </Link>
                ) : (
                  ""
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
            <Form inline>
              <b>Welcome&nbsp;</b>
              {email}
              <Nav.Link href="/" onClick={signOut}>
                Sign Out
              </Nav.Link>
            </Form>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapDispatchToProp = {
  signout,
};

const mapStateToProps = (state) => ({
  loggedin: state.users.loggedin,
  email: state.users.email,
});

export default connect(mapStateToProps, mapDispatchToProp)(Header);
