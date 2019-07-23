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
    token: "", //USER
    // token: "Basic Ym9iOmJvYnNwYXNzd29yZA==", //ADMIN
    role: "",
    id: "",
    authenticated: false, //fix here
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
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

