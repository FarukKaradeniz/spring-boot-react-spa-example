import React from "react";

import "./App.css";
import Header from "./Header";
import {Container} from "react-bootstrap";
import HomePage from "./HomePage";
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import Profil from "./Profil";
import JobDetail from "./JobDetail";
import BasvuranListe from "./BasvuranListe";
import Basvurularim from "./Basvurularim";
import PrivateRoute from "./PrivateRoute";


class App extends React.Component {

  state = {
    token: null,
    authenticated: false,
  };

  setAuthenticate = (string, tkn) => {
    console.log("String got from is " + string, "and token is:" + tkn);
    if (this.state.authenticated===false){
      this.setState({
        authenticated: true,
        token: tkn,
      })
    }
  };

  render() {


    return (
      <BrowserRouter>
        <div className="App">
          <Header
            authenticated={this.state.authenticated}
          />
          <Container fluid>
            <Route path="/" exact component={HomePage} />
            {/*<Route path="/login" component={LoginPage} />*/}
            <Route path="/login"
                   render={() => <LoginPage
                     token={this.state.token}
                     setAuthenticate={this.setAuthenticate}
                     authenticated={this.state.authenticated}/>} />
            {/*<Route path="/profil" component={Profil} />*/}
            <PrivateRoute path="/profil" authenticated={this.state.authenticated} component={Profil} />
            <Route path="/jobdetail" component={JobDetail} />
            <Route path="/basvuranlar" component={BasvuranListe} />
            <Route path="/basvurularim" component={Basvurularim} />
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

