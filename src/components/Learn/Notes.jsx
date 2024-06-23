import React, { Component } from "react";
import { Form, Image } from "react-bootstrap";
import "./Learn.css";

class Notes extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="">
          <Form className="mt-1 ask-form  ">
            <Form.Control
              as="textarea"
              rows={4}
              className=" border pb-5 px-3  "
              placeholder="Type your note here to save for later.."
              // onChange={this.controlMessage}
              // value={this.state.message.text}
            ></Form.Control>
            <div className="text-muted d-flex">
              {" "}
              <p className="d-inline ">0 notes taken</p>
              <p className="d-inline ml-auto">Press Enter to save</p>
            </div>

            <div className="mt-5 d-flex flex-column align-items-center">
              <Image
                src="https://image.freepik.com/free-vector/cartoon-exhausted-woman-sitting-table-working_74855-6943.jpg"
                width="250px"
              />
              <p>No notes saved yet</p>
              <p className="general-font">
                Take notes to remember what you learned
              </p>
            </div>
          </Form>
        </div>
      </>
    );
  }
}
export default Notes;
