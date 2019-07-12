import React from "react";

import {ListGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default class Basvurularim extends React.Component {
  componentDidMount = () => {
    console.log("basvurularim did mount");
  };

  met = () => {
    let mylist = [
      { name: "One", value: "success" },
      { name: "Two", value: "light" },
      { name: "Three", value: "light" },
      { name: "Four", value: "danger" },
      { name: "Five", value: "success" },
      { name: "Six", value: "light" }
    ];

    let itemList = mylist.map((value, index) => {
      return (
        <div key={index}>
          <Card
            bg={value.value}
            text={value.value !== "light" ? "white" : ""}
            style={{ margin: "3px" }}
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    });

    return itemList;
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bolder" }}>
          Başvurularım
        </h2>
        <ListGroup style={{ width: "60%", margin: "auto" }}>
          <Card bg="success" text="white">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          {this.met()}
        </ListGroup>
      </div>
    );
  }
}
