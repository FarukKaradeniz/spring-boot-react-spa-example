import React from "react";
import {ListGroup} from "react-bootstrap";

import JobListItem from "./JobListItem";

export default class JobList extends React.Component {
  render() {
    return (
      <ListGroup>
        <ListGroup.Item className="justify-content-center">
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
        <ListGroup.Item>
          <JobListItem />
        </ListGroup.Item>
      </ListGroup>
    );
  }
}
