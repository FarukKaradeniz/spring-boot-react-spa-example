import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";

export default function InfoMessage() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body>You've applied to the job successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};