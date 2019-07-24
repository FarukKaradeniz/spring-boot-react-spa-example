import React from "react";

import Image from "react-bootstrap/Image";


export default class LoginLinkedin extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Image src={require("../images/linkedin-image.png")} alt={"LinkedIn Sign-In Image"} />
      </div>
    );
  }
}
