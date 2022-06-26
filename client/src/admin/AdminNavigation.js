import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "rsuite";
import AdminIcon from "@rsuite/icons/Admin";

export default function AdminNavbar(props) {
  return (
    <Navbar>
      <Navbar.Brand>EUPRAVA SERVIS</Navbar.Brand>
      <Nav appearance="tab">
        <Nav.Item as={NavLink} to="/">
          Users
        </Nav.Item>
        <Nav.Item as={NavLink} to="/statistics">
          Statistics
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item as={NavLink} to="/">
          <AdminIcon />
        </Nav.Item>
        <Nav.Item onClick={props.onLogout} as={Button}>
          Logout
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
