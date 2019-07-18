import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Axios from "axios";

import "./Profil.css";
import {Image} from "react-bootstrap";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/candidate/";

export default class Profil extends React.Component {
  state = {
    userId: "",
    fullname: "",
    email: "",
    profileImg: "",
    skills: "",
    inBlackList: false,
  };

  componentDidMount = () => {
    const candidate_id = "f9f60e84-14c3-457f-a8ba-5e57f4afcee1";
    this.setState({userId: candidate_id});
    //TODO buraya id props olarak gelecek.
    this.getProfil(candidate_id);
    //TODO kişi HR'da blacklist butonu görünecek, blacklistte olduğunu belirten yazı olabilir
    // butona basılırsa kişi blackliste alınacak


  };

  getProfil = (id) => {
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
            userId: response.data.userId,
            fullname: response.data.fullname,
            email: response.data.email,
            profileImg: response.data.profileImg,
            skills: response.data.skills,
            inBlackList: response.data.inBlackList
          }
        );
      }
    );
  };


  render() {
    return (
      <div>
        <Row className="profil-wrapper">
          <Card
            className="card-row"
            style={{
              marginTop: "30px",
              width: "60%"
            }}
          >
            <Image
              src={this.state.profileImg}
              thumbnail
              style={{ width: "140px", height: "140px" }}
            />

            <Card.Body>
              <div className="profil-name">
                <h2>{this.state.fullname}</h2>
                <h6 className="text-muted">
                  <a href={"mailto:" + this.state.email}>
                    {this.state.email}
                  </a>
                </h6>
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row className="profil-wrapper">
          <Card
            style={{
              marginTop: "30px",
              width: "60%"
            }}
          >
            <Card.Header as="h3">Details</Card.Header>
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <Card.Text className="detay-text">
                {this.state.skills}
              </Card.Text>

            </Card.Body>
          </Card>
        </Row>
        {/** Basvurularım burada görünebilir ?? */}
      </div>
    );
  }
}
