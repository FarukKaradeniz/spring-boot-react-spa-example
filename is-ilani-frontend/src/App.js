import React from 'react';
import './App.css';
import Axios from "axios";

class App extends React.Component{

  state = {
    api: 'http://localhost:8080',
    username: '',
    password: '',
    response: 'Nothing',
  };

  onTestClick = () => {
    Axios({
      method: 'get',
      url: `${this.state.api}/connect/linkedIn`
    }).then(response => console.log(response));
  };


  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password)
    Axios({
      method: 'post',
      url: `${this.state.api}/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => console.log(response));



  };


  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={""} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <form onSubmit={this.onSubmitForm}>
            <input type={"text"} name={"username"} value={this.state.username} onChange={this.onInputChange}/>
            <input type={"text"} name={"password"} value={this.state.password} onChange={this.onInputChange}/>
            <input type={"submit"}/>
          </form>



          <h2
            onClick={this.onTestClick}
            className="App-link"
            rel="noopener noreferrer"
          >
            p React
          </h2>

          <h3>{this.state.response}</h3>

        </header>
      </div>
    );
  }
}

export default App;

