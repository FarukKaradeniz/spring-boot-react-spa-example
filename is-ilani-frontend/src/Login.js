import React from 'react';
import Axios from "axios";
import {Redirect} from "react-router-dom";

export default class Login extends React.Component {

  state = {
    api: 'http://localhost:8080',
    username: 'bob',
    password: 'bobspassword',
    response: 'Nothing',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);

    let config = {
      method: 'post',
      url: `${this.state.api}/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    let response_post = await Axios(config);
    console.log(response_post);

    // Axios({
    //   method: 'post',
    //   url: `${this.state.api}/login`,
    //   data: ,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(response => {
    //   console.log(response);
    //   console.log("actually here");
    //   this.props.authenticate();
    // }).catch(err => {
    //   console.log("HATA VERDİ YİNE MK");
    //   console.log(err);
    // });




  };

  basicCode() {
    return btoa(`${this.state.username}:${this.state.password}`);
  };

  onTestClick = async () => {
    let config = {
      method: 'get',
      url: `${this.state.api}/page`,
      data: {
        username: this.state.username,
        password: this.state.password
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${this.basicCode()}`
      }
    };
    let response = await Axios(config);
    console.log(response);
    // Axios({
    //   method: 'get',
    //   url: `${this.state.api}/test`,
    //   data: {
    //     _csrf: 'bdb57222-d42b-4796-a211-473b339b70f2',
    //     username: this.state.username,
    //     password: this.state.password
    //   },
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(response => {
    //   console.log(response);
    // }).catch(err => {
    //   console.log("HATA VERDİ YİNE MK");
    //   console.log(err);
    // });




  };

  render() {

    if (this.props.authenticated === true) {
      return <Redirect to={"/"} />
    }

      return (
        <div>
          <h2 onClick={this.onTestClick}>TESTING</h2>
          <form onSubmit={this.onSubmitForm}>
            <input type={"text"} name={"username"} value={this.state.username} onChange={this.onInputChange}/>
            <input type={"text"} name={"password"} value={this.state.password} onChange={this.onInputChange}/>
            <input type={"submit"}/>
          </form>
        </div>
      );
    }

}