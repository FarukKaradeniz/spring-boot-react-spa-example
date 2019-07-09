import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";


import Home from './Home';
import Protected from './Protected';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Profil from './Profil';


class App extends React.Component {

  state = {
    authenticated: false,
  };

  setAuthenticated = () => {
    if (this.state.authenticated===false){
      this.setState({authenticated: true})
    }
  };

  render() {


    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/protected"}>Protected</Link>
              <Link to={"/profil"}>Profil</Link>
            </li>

          </header>

          <Route path={"/"} exact component={Home} />
          <Route path="/login"
                 render={() => <Login authenticate={this.setAuthenticated} authenticated={this.state.authenticated}/>} />
          <PrivateRoute path={"/protected"} authenticated={this.state.authenticated} component={Protected}/>
          <PrivateRoute path={"/profil"} authenticated={this.state.authenticated} component={Profil}/>

        </div>
      </Router>
    );
  }
}

export default App;

