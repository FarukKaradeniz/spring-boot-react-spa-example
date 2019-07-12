import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import classNames from "classnames";

export default class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" static="top">
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/createjobpost">
              Oluştur
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className={classNames("nav-link", {"hidden-class": this.props.authenticated})} to="/login">
              Login
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/profil">
              Profil
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/jobdetail">
              Job Detail
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/basvuranlar">
              Basvuranlar
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/basvurularim">
              BAŞVUrULARIM
            </Link>
          </Nav.Item>
          <Nav.Item hidden>
            <Link className="nav-link" to="/profil">
              Profil
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}
