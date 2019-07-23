import React, {Fragment} from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";

import "./JobDetail.css";
import InfoMessage from "./InfoMessage";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost/";

export default class JobDetail extends React.Component {
  
  state = {
    postId: this.props.match.params.postId,
    title: "",
    deadline: "",
    description: "",
    requirements: "",
    isAvailable: false,
  };


  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    this.getJobPostDetail(postId); // getting job post detail
  };


  getJobPostDetail = (postId) => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${postId}`,
      method: 'get',
      data: {
        title: this.state.title,
        description: this.state.description,
        requirements: this.state.requirements,
        isAvailable: this.state.isAvailable,
        deadline: this.state.deadline
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);
        this.setState(
          {
            title: response.data.title,
            description: response.data.description,
            requirements: response.data.requirements,
            isAvailable: response.data.isAvailable,
            deadline: response.data.deadline
          }
        );
      }
    );

  };

  onActivePassiveClicked = () => {
    this.setState((old) => {
      return {isAvailable: !old.isAvailable}
    }, this.makePutRequest);

  };

  makePutRequest = () => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${this.state.postId}`,
      method: 'put',
      data: {
        title: this.state.title,
        description: this.state.description,
        requirements: this.state.requirements,
        isAvailable: this.state.isAvailable,
        deadline: this.state.deadline
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);
        this.setState(
          {
            title: response.data.title,
            description: response.data.description,
            requirements: response.data.requirements,
            isAvailable: response.data.isAvailable,
            deadline: response.data.deadline
          }
        );
      }
    );
  };


  applyJob = () => {
    this.setState({applied: true});
    let jobPostRequest = {
      url: `${baseUrl}/api/jobapplication/add`,
      method: 'post',
      params: {
        candidate_id: this.props.id,
        jobpost_id: this.state.postId
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);

          this.setState({
            applied: true,
            message: "You've successfully applied to this job",
            messageTitle: "Congratulations"
          });

      }
    ).catch(() => {
      this.setState({
        applied: true,
        message: "You've already applied to this job",
        messageTitle: "Failure"
      });
    });
  };


  
  render() {
    return (
      <div className="jobdetail-wrapper">
        <div className="jobdetail-header" style={{ width: "60%" }}>
          <h1>
            {this.state.title}
          </h1>
          {this.state.applied===true ? <InfoMessage message={this.state.message} messageTitle={this.state.messageTitle}/> : ""}

          { // If CANDIDATE is logged in
            this.props.authenticated===true && this.props.role==="USER" ?
              <Button onClick={this.applyJob}
                      variant={this.state.isAvailable ? "success" : "outline-secondary"} disabled={!this.state.isAvailable}>
                {
                  this.state.isAvailable ?
                    "Apply"
                    :
                  "This Job Post is not available"
                }
              </Button>
              :
              ""
          }

          { // If ADMIN is logged in
            this.props.authenticated===true && this.props.role==="ADMIN" ?
              <Fragment>
                <Link to={`/applicants/${this.state.postId}/${this.state.title}`}>
                  <Button variant="primary">Applicants</Button>
                </Link>
                <Button onClick={this.onActivePassiveClicked} variant={this.state.isAvailable ? "success" : "danger"}>
                  {this.state.isAvailable ? "Active" : "Passive"}
                </Button>
              </Fragment>
              :
              ""
          }



        </div>
        <Card style={{ width: "60%", marginBottom: "20px" }}>
          <Alert variant="primary">
            <b>Details</b>
          </Alert>
          <Card.Body>
            <Card.Subtitle className="text-muted">Deadline: {moment(new Date(this.state.deadline)).format("Do MMMM YYYY")}</Card.Subtitle>
            <hr />
            <Card.Title className={"body-title"}>Description</Card.Title>
            <Card.Text>
              {this.state.description}
            </Card.Text>
            <hr />
            <Card.Title className={"body-title"}>Requirements</Card.Title>
            <Card.Text>
              {this.state.requirements}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
