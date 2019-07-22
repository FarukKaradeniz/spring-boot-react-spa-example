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
import CreateJobPost from "./CreateJobPost";
import SignUp from "./SignUp";


class App extends React.Component {

  state = {
    token: "",
    role: "USER",
    id: "ee8f796d-57be-4d51-a8e6-945788507882",
    authenticated: true, //fix here
  };

  setAuthenticate = (string, tkn, role, id) => {
    console.log("String got from is " + string, "and token is:" + tkn);
    if (this.state.authenticated===false){
      this.setState({
        authenticated: true,
        token: tkn,
        role: role,
        id: id,
      })
    }
  };

  render() {


    return (
      <BrowserRouter>
        <div className="App">
          <Header
            role={this.state.role}
            authenticated={this.state.authenticated}
          />
          <Container fluid>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login"
                   render={() => <LoginPage
                     token={this.state.token}
                     setAuthenticate={this.setAuthenticate}
                     authenticated={this.state.authenticated}/>} />
            <PrivateRoute path="/profil"
                          authenticated={true}
                          component={() => <Profil {...this.state} />} />
            <Route exact path="/jobdetail/:postId"
                   render={(props) => <JobDetail {...this.state} {...props}/>}/>
            <Route path="/applicants/:postId" component={BasvuranListe} />
            <Route path="/basvurularim" component={Basvurularim} />
            <Route path="/createjobpost" component={CreateJobPost} />
            <Route path="/signup" component={SignUp}/>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

