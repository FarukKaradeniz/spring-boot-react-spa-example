import React from "react";

import "./styles/App.css";
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import HomePage from "./components/HomePage";
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Profil from "./components/Profil";
import JobDetail from "./components/JobDetail";
import BasvuranListe from "./components/BasvuranListe";
import Basvurularim from "./components/Basvurularim";
import PrivateRoute from "./PrivateRoute";
import CreateJobPost from "./components/CreateJobPost";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";


class App extends React.Component {
  state = {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    id: localStorage.getItem("id") || "",
    authenticated: JSON.parse(localStorage.getItem("authenticated") || "false") || false,
  };

  setAuthenticate = (string, tkn, role, id) => {
    if (this.state.authenticated===false){
      this.setState({
        authenticated: true,
        token: tkn,
        role: role,
        id: id,
      });
    }
    localStorage.setItem("token", tkn);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);
    localStorage.setItem("authenticated", "true");
  };

  logout = () => {
    this.setState({
      authenticated: false,
      token: "",
      role: "",
      id: "",
    });
    localStorage.clear(); // local storage remove everything
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            role={this.state.role}
            authenticated={this.state.authenticated}
            logout={this.logout}
          />
          <Container fluid>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login"
                   render={() => <LoginPage
                     setAuthenticate={this.setAuthenticate}
                     authenticated={this.state.authenticated}/>} />
            <PrivateRoute path="/profil"
                          authenticated={true}
                          component={() => <Profil {...this.state} />} />
            <PrivateRoute path="/basvurularim"
                          authenticated={true}
                          component={() => <Basvurularim {...this.state} />} />
            <Route exact path="/jobdetail/:postId"
                   render={(props) => <JobDetail {...this.state} {...props}/>}/>
            <PrivateRoute path="/applicants/:postId"
                          authenticated={true}
                          component={() => <BasvuranListe {...this.state} />} />
            <PrivateRoute path="/createjobpost"
                          authenticated={true}
                          component={() => <CreateJobPost {...this.state} />} />
            <Route path="/signup" component={SignUp}/>
            <Route path="/logout"
                   render={() => <Logout
                     logout={this.logout}/>}/>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

