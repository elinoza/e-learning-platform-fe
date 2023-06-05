import React, { Component } from "react";
import { Modal, Button, Row, Col, Image, Badge } from "react-bootstrap";
import "./home.css";
import { connect } from "react-redux";
import { BiCertification } from "react-icons/bi";


const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  goalModalToggle: (payload) =>
    dispatch({
      type: "TOGGLE_GOAL_MODAL",
      payload: payload,
    }),
    fetchMewithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const me = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_ME",
          payload: me,
        });
        dispatch({
            type: "TOGGLE_GOAL_MODAL",
            payload: false,
          });

      
        console.log("me endpoint", me);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: me,
        });
      }
    }),
});
class GoalModal extends Component {
state={
    boxes:[15,30,60,120],
    selected:{myWeeklyGoal:""}
}


handleClose=()=>{
    this.props.fetchMewithThunk()

}
   saveGoal=async()=>{
    try {
        const token = localStorage.getItem("token");
        const url = process.env.REACT_APP_URL;
        const response = await fetch(url + "/users/me", {
          method: 'PUT', 
          headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(this.state.selected)
        });
    
        
    
        if (response.ok) {
            // this.props.goalModalToggle()
            // this.handleClose()
            this.props.fetchMewithThunk()
         
        } else {
       console.log("save error",response)
        }
    
        
      } catch (error) {
        console.log(error)
        
    }
   }
  render() {
    return (
      <div className="goal-Modal">
        <Modal
          show={this.props.goal.show_goal_Modal}
          onHide={() => this.props.goalModalToggle(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "16px" }}>
              Set a Weekly Goal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={8}>
                  
                <div  className="w-100 d-flex justify-content-center">
                {this.state.boxes.map(box=>
                
                
                <a  onClick={()=>this.setState({ selected:{myWeeklyGoal:box}})}>
                    <div className={this.state.selected.myWeeklyGoal === box ? "take_meals_opt border p-1 selected":"take_meals_opt border p-1 "  }>
                      <h5 className="m-0 mt-2">{box}</h5>
                      <p className="m-0">mins</p>
                    </div>
                  </a>)}
               
                </div>
                <div
                  className="w-100 mt-2 py-2 px-2 "
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <div>
                
                    <p style={{ fontWeight: "bold" }}>
                    <BiCertification className="mr-1"/>
                      Keep it Casual
                      <Badge className="linkedin-blue-bg text-white ">
                        Recommended
                      </Badge>{" "}
                    </p>
                    <p style={{ fontSize: "12px" }} className="text-muted ">
                      Half an hour is all it takes
                    </p>{" "}
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex flex-column align-items-center">
                  <Image
                    src="https://image.freepik.com/free-vector/ambition-abstract-concept_335657-3013.jpg"
                    width="100%"
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
            className="linkedin-blue-color"
            style={{
                backgroundColor: "transparent",
                border: "1px solid #0973B1",
                color: "#0973B1", fontWeight: "bold" 
              }}
              onClick={() => this.props.goalModalToggle(false)}
            >
              Close
            </Button>
            <Button
             className="linkedin-blue-bg"
              onClick={this.saveGoal}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalModal);
