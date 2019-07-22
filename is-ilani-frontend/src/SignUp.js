import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import {Redirect} from "react-router-dom";

const baseUrl = "http://localhost:8080";
const pathUrl = "/signup";

export default class SignUp extends React.Component {
  state = {
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    success: null,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    let ifValid = this.checkAllFieldsAreValid();

    if (ifValid === false) {
      console.log(baseUrl, pathUrl);
      let jobPostRequest = {
        url: `${baseUrl}${pathUrl}`,
        method: 'post',
        data: {
          email: this.state.email,
          password: this.state.password
        },
        params: {
          fullname: this.state.fullname
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      };
      Axios(jobPostRequest).then(
        response => {
          console.log(response);
          this.setState({success: "x"});
        }
      );
    }

  };

  checkAllFieldsAreValid = () => {
    return (this.state.email==="" ||
      this.state.password==="" ||
      this.state.passwordConfirm==="" ||
      this.state.fullname==="") &&
      (this.state.password===this.state.passwordConfirm);
  };

  render() {
    if (this.state.success !== null) {
      return <Redirect to="/"/>
    }

    return(
      <div
        className="text-center"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ width: "30%" }}>
          <h2 style={{ fontWeight: "bold" }}>Sign Up</h2>
          <br />
          <form onSubmit={this.onFormSubmit}>
            <Form.Group controlId="fullname">
              <Form.Control
                value={this.state.fullname}
                onChange={e => this.setState({ fullname: e.target.value })}
                type="text"
                placeholder="Enter Your Full Name"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Enter Email"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control
                value={this.state.password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Enter Password"
              />
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Control
                value={this.state.passwordConfirm}
                type="password"
                onChange={e => this.setState({ passwordConfirm: e.target.value })}
                placeholder="Enter Password Again"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

