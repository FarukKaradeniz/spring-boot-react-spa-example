import React from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import "./JobDetail.css";

export default class JobDetail extends React.Component {
  render() {
    return (
      <div className="jobdetail-wrapper">
        <div className="jobdetail-header" style={{ width: "60%" }}>
          <h1>
            <b>1422</b> - Java Developer
          </h1>
          {
            // Eğer giren kullanıcı HR ise başvuranları göster desin, USER ise başvur desin
            // bu kısımları methodlardan dönecek hale getir 'function component' misali
          }
          <Button variant="primary">Apply</Button>
        </div>
        <Card style={{ width: "60%", marginBottom: "20px" }}>
          <Alert variant="primary">
            <b>Detaylar</b>
          </Alert>
          <Card.Body>
            <Card.Subtitle className="text-muted">10.11.2018</Card.Subtitle>
            <hr />
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.
            </Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
