import React from "react";
import {Alert, Button, ListGroup} from "react-bootstrap";

export default class BasvuranListe extends React.Component {
  met = () => {
    let mylist = [
      { name: "One", value: 1 },
      { name: "Two", value: 2 },
      { name: "Three", value: 3 },
      { name: "Four", value: 4 },
      { name: "Five", value: 5 },
      { name: "Six", value: 6 }
    ];
    /**
     *           <Link to={`/profil/${index}`}>
     <Button style={{ float: "right" }} variant="outline-primary">
     Primary
     </Button>
     </Link>
     */

      //butona tıkladığında disable yapabilirsind
    let itemList = mylist.map((value, index) => {
        return (
          <ListGroup.Item key={index}>
            <h2 style={{ float: "left" }}>{value.name}</h2>
            <div style={{ float: "right", width: "30%" }}>
              <Button
                onClick={() => console.log("Clicked olumlu", value)}
                style={{ float: "left" }}
                variant="outline-success"
              >
                Olumlu
              </Button>
              <Button
                onClick={() => console.log("Clicked olumsuz", value)}
                style={{ float: "right" }}
                variant="outline-danger"
              >
                Olumsuz
              </Button>
            </div>
          </ListGroup.Item>
        );
      });

    return itemList;
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <Alert variant="info">
          <h2>Java Developer</h2>
        </Alert>

        <ListGroup style={{ width: "50%" }}>{this.met()}</ListGroup>
      </div>
    );
  }
}
