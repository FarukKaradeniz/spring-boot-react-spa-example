import React from "react";

import Row from "react-bootstrap/Row";

import JobList from "./JobList";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <JobList />
        </Row>
      </div>
    );
  }
}
