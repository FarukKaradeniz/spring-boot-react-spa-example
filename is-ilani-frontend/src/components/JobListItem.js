import React from "react";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import moment from "moment";

export default class JobListItem extends React.Component {
  render() {
    return (
      <Card>
        <Alert variant="primary"
               style={{
                 fontFamily: "Noto Sans, sans-serif",
                 fontSize: "1.4em"
               }}
        >
          <b>{this.props.title}</b>
        </Alert>
        <Card.Body>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          <Card.Subtitle className="text-muted">
            Posted on {moment(new Date(this.props.deadline)).format("Do MMMM YYYY")}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
