import React from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

export default class JobListItem extends React.Component {
  render() {
    return (
      <Card>
        <Alert variant="primary">
          <b>YYYY</b>
        </Alert>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Subtitle className="text-muted">
            Posted on 2.7.2019
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
