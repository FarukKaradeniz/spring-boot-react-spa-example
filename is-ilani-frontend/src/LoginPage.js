import React from "react";
import LoginHr from "./LoginHr";

import "./LoginPage.css";
import LoginLinkedin from "./LoginLinkedin";
import Row from "react-bootstrap/Row";

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
            token={this.props.token}
            authenticated={this.props.authenticated}
            setAuthenticate={this.props.setAuthenticate}
          />
        </Row>
      </div>
    );
  }
}
