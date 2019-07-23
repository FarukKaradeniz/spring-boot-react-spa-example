import React, {Fragment} from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from 'react-bootstrap/Image'
import {Link} from "react-router-dom";
import classNames from "classnames";

export default class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light" static="top" style={{justifyContent: 'space-between'}}>
        <Navbar.Brand>
          <Link to="/">
            <Image src={require("./images/brand-logo.png")} height={30}/>
          </Link>
        </Navbar.Brand>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          { // If noone is logged in
            this.props.authenticated===false && this.props.role==="" ?
            <Nav.Item>
              <Link className={classNames("nav-link", {"hidden-class": this.props.authenticated})} to="/login">
                Login
              </Link>
            </Nav.Item>
          :
          ""}

          { // If ADMIN is logged in
            this.props.authenticated===true && this.props.role==="ADMIN" ?
              <Nav.Item>
                <Link className="nav-link" to="/createjobpost">
                  Oluştur
                </Link>
              </Nav.Item>
              :
              ""
          }

          { // If CANDIDATE is logged in
            this.props.authenticated===true && this.props.role==="USER" ?
              <Fragment>
                <Nav.Item>
                  <Link className="nav-link" to="/profil">
                    Profile
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-link" to="/basvurularim">
                    My Applications
                  </Link>
                </Nav.Item>
              </Fragment>
              :
              ""
          }
          {
            this.props.authenticated ?
              <Nav.Item>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </Nav.Item>
              :
              ""
          }

        </Nav>
      </Navbar>
    );
  }
}
