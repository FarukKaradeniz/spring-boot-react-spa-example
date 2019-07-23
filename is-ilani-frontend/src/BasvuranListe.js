import React from "react";
import {Alert, Button, ListGroup} from "react-bootstrap";
import Axios from "axios";
import {Link} from "react-router-dom";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost/";

export default class BasvuranListe extends React.Component {
  
  state = {
    listOfApplicants: [],
    // postId: this.props.postId,
    title: "",
    clickedList: [],
  };

  
  componentDidMount = () => {
    const postId = window.location.href.split("/")[4];
    console.log(postId);
    const title = window.location.href.split("/")[5].replace("%20", ' ');
    if(title !== undefined){
      this.setState({title: title});
    }
    this.getJobPostDetail(postId);
  };

  getJobPostDetail = (postId) => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${postId}/applications`,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.props.token,
      }
    };

    Axios(jobPostRequest).then(
      response => {
        this.setState(
          {
            listOfApplicants: response.data
          }
        );
      }
    );

  };

  populateUIList = () => {
    return this.state.listOfApplicants
      .map((data, index) => {
        return (
          <ListGroup.Item key={index}>
            <Link to={`/profil/${data.candidate_id}`}>
              <h2 style={{float: "left"}}>{data.fullname}</h2>
            </Link>
            <div style={{float: "right", width: "30%"}}>
              <Button
                onClick={() => this.buttonClickedFor(data, "KABUL")}
                style={{float: "left"}}
                variant={this.ifContainsElement(this.state.clickedList, {
                  application_id: data.application_id
                }) && (this.state.clickedList.find(e => data.application_id === e.application_id).status === 'KABUL') ? "success" : "outline-success"}
                disabled={this.ifContainsElement(this.state.clickedList, {
                  application_id: data.application_id,
                })}
              >
                Olumlu
              </Button>
              <Button
                onClick={() => this.buttonClickedFor(data, "RED")}
                style={{float: "right"}}
                variant={this.ifContainsElement(this.state.clickedList, {
                  application_id: data.application_id
                }) && (this.state.clickedList.find(e => data.application_id === e.application_id).status === 'RED') ? "danger" : "outline-danger"}
                disabled={this.ifContainsElement(this.state.clickedList, {
                  application_id: data.application_id,
                })}
              >
                Olumsuz
              </Button>
            </div>
          </ListGroup.Item>
        );
      });
  };

  buttonClickedFor = (data, status) => {
    // şimdilik eğer tıklama yapıldıysa direk olarak istek atılacak.
    let clickedData = {
      application_id: data.application_id,
      status: status,
    };
    let clickedList = this.state.clickedList;
    if (this.ifContainsElement(clickedList, clickedData) === false) {
      clickedList.push(clickedData);
    }
    this.setState({clickedList: clickedList});
    this.postEvaluationOfApplication(data, status);
  };

  ifContainsElement = (list, element) => list.some(e => e.application_id === element.application_id /** && e.status === element.status */);

  postEvaluationOfApplication = (data, status) => {
    let jobPostRequest = {
      url: `${baseUrl}/api/jobapplication`,
      method: 'put',
      params: {
        application_id: data.application_id,
        status: status
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.props.token,
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);
      }
    );
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <Alert variant="info">
          <h2>{this.state.title !== "" ? this.state.title : "Job Post Applicants"}</h2>
        </Alert>

      {this.state.listOfApplicants.length !== 0 ? 
        <ListGroup style={{ width: "50%" }}>{this.populateUIList()}</ListGroup> : 
        <h1>No Applicants to this job post.</h1> /** TODO BURAYI Method icerisinde güzelleştir */}

      </div>
    );
  }
}
