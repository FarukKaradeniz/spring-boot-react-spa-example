import React from "react";

import {ListGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Axios from "axios";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost/candidate/";

export default class Basvurularim extends React.Component {
  state = {
    id: "",
    applications: [],
  };
  
  componentDidMount = () => {
    const candidate_id = "f9f60e84-14c3-457f-a8ba-5e57f4afcee1";
    this.setState({id: candidate_id});
    //TODO buraya id props olarak gelecek.
    this.getBasvurularim(candidate_id);
  };


  bgValue = (status) => {
    if (status === "KABUL") {
      return "success";
    }
    else if (status === "RED") {
      return "danger";
    }
    else {
      return "light";
    }

  };

  populateUIList = () => {
    return this.state.applications.map((data, index) => {
      return(
        <Link to={`/jobdetail/${data.jobPostId}`}  key={index}>
          <div>
            <Card
              bg={this.bgValue(data.status)}
              text={this.bgValue(data.status) !== "light" ? "white" : ""}
              style={{ margin: "3px" }}
            >
              <Card.Header>{data.jobPostTitle+"\t( "+data.status+")"}</Card.Header>
            </Card>
          </div>
        </Link>
      );
    });
  };

  getBasvurularim = (id) => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${id}`,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);
        this.setState(
          {
            applications: response.data
          }
        );
      }
    );
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bolder" }}>
          Başvurularım
        </h2>
        <ListGroup style={{ width: "60%", margin: "auto" }}>
          {this.populateUIList().length === 0 ? "You don't have any job applications" : this.populateUIList()}
        </ListGroup>
      </div>
    );
  }
}