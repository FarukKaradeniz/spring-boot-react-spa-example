import React from "react";
import LoginHr from "./LoginHr";

import "./LoginPage.css";
import LoginLinkedin from "./LoginLinkedin";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";

export default class LoginPage extends React.Component {

  render() {
    return (
      <div className="login-page">
        <Row style={{ marginTop: "10%" }} />
        <Row>
          <LoginLinkedin />
        </Row>
        <Row
          className="text-muted"
          style={{ marginBottom: "40px", marginTop: "40px" }}
        >
          OR
        </Row>
        <Row>
          <LoginHr
            authenticated={this.props.authenticated}
            setAuthenticate={this.props.setAuthenticate}
          />
        </Row>
        <Row
          style={{ marginBottom: "10px", marginTop: "40px" }}
        >
        </Row>
        <Row
          className="text-muted"
          style={{ marginTop: "40px" }}
        >
          If you don't have an account
        </Row>
        <Row>
          <Link to={"/signup"}>
             SIGN UP
          </Link>
        </Row>
      </div>
    );
  }
}
