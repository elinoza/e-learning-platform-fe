import React, { Component } from "react";
import { Modal, Button, Row, Col, Image, Badge } from "react-bootstrap";
import "./home.css";

class NewModal extends Component {
  render() {
    return (
      <Modal show={true}>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default NewModal;
