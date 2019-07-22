import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Axios from "axios";

import "./Profil.css";
import {Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UpdateSkillDialog from "./UpdateSkillDialog";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const baseUrl = "http://localhost:8080";
const pathUrl = "/api/candidate/";

export default class Profil extends React.Component {
  state = {
    userId: "",
    fullname: "",
    email: "",
    profileImg: "",
    inBlacklist: false,
    skills: "",
    updateSkill: false,
  };

  componentDidMount = () => {
    const candidate_id = this.props.id;
    this.setState({userId: candidate_id});
    this.getProfil(candidate_id);
  };

  getProfil = (id) => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${id}`,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        //todo buraya authorization gelecek
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
            inBlacklist: response.data.inBlacklist,
          }
        );
      }
    );
  };


  onBlacklisted = () => {
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}${this.props.id}`,
      method: 'put',
      params: {
        id: this.props.id
      },
      data: {
        inBlacklist: !this.state.inBlacklist
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        //todo buralara authorization header'ı eklenecek
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
            inBlacklist: response.data.inBlacklist
          }
        );
      }
    );
  };

  onUpdateSkill = () => {
    this.setState((old)=> {
      return {updateSkill: !old.updateSkill}
    });
  };

  onSkillAndProfileImgUpdate(profileImg, skills) {
    this.setState({
        profileImg: profileImg,
        skills: skills
    });
  };


  render() {
    return (
      <div>
        { // If user is logged in show him update profile dialog
          this.state.updateSkill && this.props.role==="USER"?
          <UpdateSkillDialog
            id={this.state.userId}
            skills={this.state.skills}
            profileImg={this.state.profileImg}
            updated={(profileImg, skills) => this.onSkillAndProfileImgUpdate(profileImg, skills)} />
          : ""}

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
        { // If Admin is logged in show blacklist button
          this.props.role==="ADMIN" ?
            <Button
              onClick={this.onBlacklisted}
              variant={this.state.inBlacklist ? "outline-secondary" : "secondary"}
              style={{marginTop: "20px"}}>
              {this.state.inBlacklist ? "Remove from blacklist" : "Add to blacklist"}
            </Button>
            :
            ""
        }

        <Row className="profil-wrapper">
          <Card
            style={{
              marginTop: "30px",
              width: "60%"
            }}
          >
            <Card.Header as="h3">Details</Card.Header>
            <Card.Body>
              <Card.Title>
                <div onClick={this.onUpdateSkill}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Click to update Skill and Profile Image
                      </Tooltip>
                    }
                  >
                    <p>Skills</p>
                  </OverlayTrigger>

                </div>
              </Card.Title>
              <Card.Text className="detay-text">
                {this.state.skills}
              </Card.Text>

            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}
