import React from "react";

import {ListGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Axios from "axios";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost/candidate/";

export default class CandidateApplications extends React.Component {
  state = {
    id: "",
    applications: [],
  };

  componentDidMount = () => {
    const candidate_id = this.props.userId;
    this.setState({id: candidate_id});
    this.getBasvurularim(this.props.userId);
  };

  populateUIList = () => {
    return this.state.applications.map((data, index) => {
      return(
        <Link to={`/jobdetail/${data.jobPostId}`}  key={index}>
          <div>
            <Card
              bg="light"
              text="dark"
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
        'Authorization': this.props.token,
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
    ).then(err => console.log("error", err))
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
        <h3 style={{ marginBottom: "10px" }}>
          Candidate Applications
        </h3>
        <ListGroup style={{ width: "60%", margin: "auto" }}>
          {this.populateUIList().length === 0 ? "This user have any job applications" : this.populateUIList()}
        </ListGroup>
      </div>
    );
  }
}