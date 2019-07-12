import React from "react";

import Row from "react-bootstrap/Row";

import JobList from "./JobList";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Row>Burada Birşeyler olabilir şimdilik kalsın</Row>
        <Row className="justify-content-center">
          <JobList />
        </Row>
      </div>
    );
  }
}
