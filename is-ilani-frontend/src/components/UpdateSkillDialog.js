import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import Axios from "axios";


const baseUrl = "http://localhost:8080";
const pathUrl = "/api/candidate";
export default class UpdateSkillDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      skills: props.skills,
      profileImg: props.profileImg,
    }
  }


  componentDidMount() {
    this.setState({skills: this.props.skills});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  onSubmit = () => {
    this.setState({show: false});
    let jobPostRequest = {
      url: `${baseUrl}${pathUrl}`,
      method: 'put',
      params: {
        id: this.props.id
      },
      data: {
        skills: this.state.skills,
        profileImg: this.state.profileImg,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': this.props.token,
      }
    };

    Axios(jobPostRequest).then(
      response => {
        this.props.updated(response.data.profileImg, response.data.skills);
      }
    );

  };

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Skill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              value={this.state.skills || ''}
              onChange={e => this.setState({ skills: e.target.value })}
              type="text"
              placeholder="Enter skills"
            />
            <br />
            <Form.Control
              value={this.state.profileImg || ''}
              onChange={e => this.setState({ profileImg: e.target.value })}
              type="text"
              placeholder="Enter profile image url"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }


};