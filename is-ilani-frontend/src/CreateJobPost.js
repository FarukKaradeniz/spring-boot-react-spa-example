import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Axios from "axios";
import {Redirect} from "react-router-dom";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost";

export default class CreateJobPost extends React.Component {
  state = {
    title: "",
    description: "",
    requirements: "",
    isAvailable: true,
    deadline: new Date().setDate(new Date().getDate() + 1),
    created: false,
    createdJobPostId: "",
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    let ifEmpty = this.checkAllFieldsNotEmpty();
    
    if (ifEmpty === false) {
      console.log(baseUrl, pathUrl);
      let jobPostRequest = {
        url: `${baseUrl}${pathUrl}`,
        method: 'post',
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
          'Authorization': this.props.token,
        }
      };
      Axios(jobPostRequest).then(
        response => {
          this.setState({created: true, createdJobPostId: response.data.jobPostId});
        }
      );
    } 
    
  };

  checkAllFieldsNotEmpty = () => {
    return this.state.title==="" || this.state.description==="" || this.state.requirements==="";
  };

  render() {
    if (this.state.created===true && this.state.createdJobPostId!=="") {
      return <Redirect to={`/jobdetail/${this.state.createdJobPostId}`} /> // /jobdetail?id=XXXXX gibi bişeye gidecek
    }

    return (
      <div
        className="text-center"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ width: "50%" }}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Noto Sans, sans-serif" }}>Create Job Post</h2>
          <br />
          <form onSubmit={this.onFormSubmit}>
            <Form.Group controlId="title">
              <Form.Control
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group controlId="requirements">
              <Form.Control
                value={this.state.requirements}
                onChange={e => this.setState({ requirements: e.target.value })}
                placeholder="Requirements"
                as="textarea"
                rows="6"
              />
            </Form.Group>
            <Form.Group controlId="isAvailable">
              <Form.Check
                value={this.state.isAvailable}
                onClick={e => this.setState({ isAvailable: e.target.checked })}
                type="checkbox"
                label="Availability"
                defaultChecked
              />
            </Form.Group>
            <Form.Group controlId="deadline">
              <DatePicker
                selected={this.state.deadline}
                onChange={e => this.setState({ deadline: Date.parse(e) })}
                dateFormat="dd/MM/yyyy"
                minDate={new Date().setDate(new Date().getDate() + 1)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{fontFamily: "Noto Sans, sans-serif"}}>
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
