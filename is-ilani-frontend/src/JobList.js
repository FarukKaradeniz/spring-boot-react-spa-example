import React from "react";
import {ListGroup} from "react-bootstrap";

import JobListItem from "./JobListItem";
import Axios from "axios";
import {Link} from "react-router-dom";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/jobpost";

export default class JobList extends React.Component {
  
  state = {
    posts: [],
  };

  componentDidMount = () => {
    this.getJobPosts();
  };

  populateUI = () => {
    return this.state.posts.map((data, index) => {
      return(
        <div key={index}>
          <Link to={`/jobdetail/${data.jobPostId}`}>
            <JobListItem
              title={data.title}
              description={data.description}
              deadline={data.deadline}
            />
          </Link>
          <br />
        </div>
      );
    });
  };
  
  getJobPosts = () => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}`,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        isAvailable: true
      }
    };

    Axios(jobPostRequest).then(
      response => {
        console.log(response);
        this.setState(
          {
            posts: response.data,
          }
        );
      }
    );
  };

  render() {
    return (
      <ListGroup>
        {this.populateUI()}
      </ListGroup>
    );
  }
}
