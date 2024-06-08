import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./homepageheader.css";
import { Collapse, Nav } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <h1>Wellcom To Whether App</h1>
      <header className="header">
        <Nav className="navbar bg-dark">
          <List
            className="list-button"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          ></List>
          <Collapse in={open}>
            <div className="collapse-container">
              <Link to={"/signin"} className="link">
                Sign In
              </Link>
              <Link to={"/signup"} className="link">
                Sign Up
              </Link>
            </div>
          </Collapse>
        </Nav>
      </header>
    </>
  );
};

export default Header;
