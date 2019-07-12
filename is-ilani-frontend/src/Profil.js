import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import "./Profil.css";
import {Image} from "react-bootstrap";

export default class Profil extends React.Component {
  state = {
    url: "https://avatars1.githubusercontent.com/u/22941245?v=4"
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
              src={this.state.url}
              thumbnail
              style={{ width: "140px", height: "140px" }}
            />

            <Card.Body>
              <div className="profil-name">
                <h2>Ömer Faruk Karadeniz</h2>
                <h6 className="text-muted">krdnzomer@gmail.com</h6>
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
            <Card.Header as="h3">Detaylar</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text className="detay-text">
                With supporting text below as a natural lead-in to additional
                content.With supporting text below as a natural lead-in to
                additional content.With supporting text below as a natural
                lead-in to additional content.With supporting text below as a
                natural lead-in to additional content.
              </Card.Text>
              <hr />
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text className="detay-text">
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
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
            <Card.Header as="h3">Detaylar</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text className="detay-text">
                With supporting text below as a natural lead-in to additional
                content.With supporting text below as a natural lead-in to
                additional content.With supporting text below as a natural
                lead-in to additional content.With supporting text below as a
                natural lead-in to additional content.
              </Card.Text>
              <hr />
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text className="detay-text">
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}
