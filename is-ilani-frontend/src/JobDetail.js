import React from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";

import "./JobDetail.css";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost/";

export default class JobDetail extends React.Component {
  
  state = {
    postId: this.props.match.params.postId,
    title: "",
    user: false, // user mı admin mi olacak kısım
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
  
  render() {
    return (
      <div className="jobdetail-wrapper">
        <div className="jobdetail-header" style={{ width: "60%" }}>
          <h1>
            {this.state.title}
          </h1>
          {
            // Eğer giren kullanıcı HR ise başvuranları göster desin, USER ise başvur desin
            // bu kısımları methodlardan dönecek hale getir 'function component' misali
            // if (this.state.user === false) {
            //   <Link to={`/applicants/${this.state.postId}`}></Link>
            // }
            // alttaki gibi bişey olacak
          }
          
          <Link to={`/applicants/${this.state.postId}/${this.state.title}`}>
          <Button variant="primary">Apply</Button>
          </Link>
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
