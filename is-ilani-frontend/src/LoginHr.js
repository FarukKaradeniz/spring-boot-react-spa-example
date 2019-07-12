import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

export default class LoginHr extends React.Component {
  state = {
    username: "",
    password: "",
    apiUrl: "http://localhost:8080",
  };

  // onFormSubmit = e => {
  //   e.preventDefault();
  //   console.log(this.state.username, ":", this.state.password);
  // };

  onFormSubmit= async (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);

    // let config = {
    //   method: 'post',
    //   url: `${this.state.apiUrl}/login`,
    //   data: {
    //     username: this.props.username,
    //     password: this.props.password
    //   },
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   }
    // };
    // let response_post = await Axios(config);
    // console.log(response_post);
    this.props.setAuthenticate("TEST", `${this.state.username}:${this.state.password}`);
  };

  basicCode = () => {
    return btoa(`${this.state.username}:${this.state.password}`);
  };

  render() {
    if (this.props.authenticated === true && this.props.token !== null) {
      return <Redirect to={"/"} />
    }

    return (
      <div className="text-center" style={{ width: "18rem" }}>
        <form onSubmit={this.onFormSubmit}>
          <Form.Group controlId="username">
            <Form.Control
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              type="username"
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
