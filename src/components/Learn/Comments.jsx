import React, { Component } from "react";
import {
  Col,
  Form,
 Image,
  Card,
  Button
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import { Avatar } from "@material-ui/core";
import "./Learn.css";


class Comments extends Component {
  state = {};

  render() {
    return (
      <>
        <Form className="mt-1 ask-form border pb-5 px-3 shadow ">
						<Form.Control
							as="textarea"
							rows={4}
							className="border-0 noManualResize "
							placeholder="Ask here to share with learners,experts & others"
							// onChange={this.controlMessage}
							// value={this.state.message.text}
						></Form.Control>
					

						<Button
							className=" float-right mt-1 py-0"
							
							
						>
						Ask
						</Button>
					</Form>

          <Card className="CommentCard mt-5 shadow">
										                               
										<Card.Header
											className="d-flex m-0"
											style={{ backgroundColor: "#FFFFFF" }}
										>
                       <Avatar
                                src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png"
                                className="navbar-logo m-0 mt-1  mr-4 p-0 d-inline"
                              />
                              <div>
                                {" "}
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                  }}
                                  className="d-block ml-1 mb-0 p-0 "
                                >
                                  Dorie Clark
                                </p>
                                <p
                                  style={{ fontSize: "14px" }}
                                  className="d-block ml-1 mb-0 p-0 "
                                >
                                  Professor of Something
                                </p>
                               
                              </div>
										
											<a className=" ml-auto a-tags ">
												{" "}
												<BsThreeDots />
											</a>
										</Card.Header>
									
										<Card.Body>
									
											<Card.Title>
                        <div className="pb-5 mb-5">
                          <p>

                            Hi! 
                            I dont understand how he resized the div?  Can you help me?
                          </p>
                        </div>
												<Image
													src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80"
													roundedCircle
													className="profilePic-mini mr-1"
												/>
												<p className="d-inline general-font">
													<span>
														<a className="a-tags font-weight-bold">somebody</a>
													</span>{" "}
													&{" "}
													<span>
														<a className="a-tags font-weight-bold">
															260 people
														</a>
													</span>{" "}
													liked this
												</p>

											</Card.Title>
											<Card.Text>
												
												
											
                        
                          <div>
                            <p className="p-0 m-0  mr-2 d-inline general-font font-weight-bold">
                              {" "}
                           user
                            </p>
                            <p className="m-0 p-0  ">comment</p>
                          </div>
                     


												<p
													className="text-muted mt-2 mb-0"
													style={{ fontSize: "10px" }}
												>
													{" "}
													22 MINS AGO
												</p>
											</Card.Text>
										</Card.Body>
										<Card.Footer
											className="d-flex m-0"
											style={{ backgroundColor: "#FFFFFF" }}
										>
											<Form className="cursor ">
												<Form.Row>
													<Col xs={1}>
														<VscSmiley className="mr-3 icons mt-2" />
													</Col>
													<Col xs={8}>
														<Form.Control
															id="text"
															type="text"
															placeholder="Add comment..."
															className="rq-form-element  "
															// value={this.state.comment.text}
															// onChange={this.updateField}
														/>
													</Col>
													<Col xs={3}>
														<p
															// onClick={() => this.submitForm(post._id)}
															className="mb-1 mt-2 ml-auto d-inline"
														>
															<span>
																<a
																	className="a-tags font-weight-bold  "
																	style={{ color: "#0095F6" }}
																>
																	Share{" "}
																</a>
															</span>{" "}
														</p>
													</Col>
												</Form.Row>
											</Form>
										</Card.Footer>
									</Card>
            </>
    );
  }
}
export default Comments;
