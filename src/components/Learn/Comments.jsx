import React, { Component } from "react";
import { Col, Form, Image, Card, Button,DropdownButton ,Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { AiTwotoneLike} from "react-icons/ai";
import { Avatar } from "@material-ui/core";
import "./Learn.css";
import { formatDistance, parseISO } from "date-fns";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchPostswithThunk: (courseId) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/" + courseId + "/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const posts = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_CURRENT_POSTS",
          payload: posts,
        });
        console.log("posts from qa component ", posts);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: posts,
        });
      }
    }),
  fetchCommentswithThunk: (postId) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/posts/" + postId + "/comments", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const comments = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_CURRENT_COMMENTS",
          payload: comments,
        });
        console.log("comments from qa component ", comments);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: comments,
        });
      }
    }),
});

class Comments extends Component {
  state = {
    message: {
      text: "",
    },
    comment: { text: "" },

    commentShow: false,
	modifyPost:false,
	modifiedMessage: {
		text: "",
	  },

	  modifyComment:false,
	  modifiedComment: {
		text: "",
	  },
  };

  askQuestion = async (e) => {
    e.preventDefault();

    // let params = new URLSearchParams(window.location.search);

    // let courseId = params.split("/")[1]
    // let courseId= this.props.player.currentCourse._id
	let courseId = this.props.courseId;

    try {
      console.log(courseId);

      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/" + courseId + "/posts", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.message),
      });

      if (response.ok) {
        this.setState({ message: { text: "" } });
        this.props.fetchPostswithThunk(courseId);
      } else {
        console.log("save error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  postFetchComments = async (postId) => {
    try {
      console.log("postId", postId);

      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/posts/" + postId + "/comments", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.comment),
      });

      if (response.ok) {
        this.props.fetchCommentswithThunk(postId);
        this.setState({ comment: { text: "" } });
      } else {
        console.log("save error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (e, postId) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.postFetchComments(postId);
    }
  };
  seeAnswers = (postId) => {
    this.props.fetchCommentswithThunk(postId);
    this.setState({ commentShow: true });
  };
  deletePost=async (postId)=>{

	try {
		console.log("postId", postId);
		let courseId = this.props.courseId;
		const token = localStorage.getItem("token");
		const url = process.env.REACT_APP_URL;
		const response = await fetch(url + "/videos/" + courseId + "/posts/"+ postId , {
		  method: "DELETE",
		  headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		  }
		});
  
		if (response.ok) {
		  this.props.fetchPostswithThunk(courseId);
		
		} else {
		  console.log("save error", response);
		}
	  } catch (error) {
		console.log(error);
	  }

  }

  modifyPost=async (postId)=>{
	try {
		console.log("postId", postId);
		let courseId = this.props.courseId;
		const token = localStorage.getItem("token");
		const url = process.env.REACT_APP_URL;
		const response = await fetch(url + "/videos/" + courseId + "/posts/"+ postId , {
		  method: "PUT",
		  headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(this.state. modifiedMessage),
		});
  
		if (response.ok) {
		  this.props.fetchPostswithThunk(courseId);
		  this.setState({ modifiedMessage: { text: "" },modifyPost:false });
		
		} else {
		  console.log("save error", response);
		}
	  } catch (error) {
		console.log(error);
	  }

  
	  
}
deleteComment=async (postId,commentId)=>{
	try {
	
		const token = localStorage.getItem("token");
		const url = process.env.REACT_APP_URL;
		const response = await fetch(url + "/posts/" + postId + "/comments/"+ commentId, {
		  method: "DELETE",
		  headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		  }
		});
  
		if (response.ok) {
		  this.props.fetchCommentswithThunk(postId);
		
		} else {
		  console.log("save error", response);
		}
	  } catch (error) {
		console.log(error);
	  }
}

modifyComment=async (postId,commentId)=>{
	try {
		console.log("postId", postId);
		let courseId = this.props.courseId;
		const token = localStorage.getItem("token");
		const url = process.env.REACT_APP_URL;
		const response = await fetch(url + "/posts/" + postId+ "/comments/"+ commentId , {
		  method: "PUT",
		  headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(this.state.modifiedComment),
		});
  
		if (response.ok) {
			this.props.fetchCommentswithThunk(postId);
		  this.setState({ modifiedComment: { text: "" },modifyComment:false });
		} else {
		  console.log("save error", response);
		}
	  } catch (error) {
		console.log(error);
	  }

}
handleModify=(e, postId) => {
    if (e.keyCode === 13) {
    e.preventDefault(); 
	this.modifyPost(postId)}
}
handleModifyComment=(e, postId,commentId) => {
    if (e.keyCode === 13) {
    e.preventDefault(); 
	this.modifyComment(postId,commentId)}
}

likePost = async (postId)=> {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/posts/like/"+postId, {
        method: 'POST', 
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
      });
  
      
  
      if (response.ok) {
       this.props.fetchPostswithThunk(this.props.courseId)
       
      } else {
     console.log("save error",response)
      }
  
      
    } catch (error) {
      console.log(error)
      
  }}

  unlikePost = async (postId)=> {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/posts/unlike/"+postId, {
        method: 'POST', 
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
      });
  
      
  
      if (response.ok) {
		this.props.fetchPostswithThunk(this.props.courseId)
       
      } else {
     console.log("save error",response)
      }
  
      
    } catch (error) {
      console.log(error)
      
  }}
  componentDidMount = () => {
    let courseId = this.props.courseId;
    this.props.fetchPostswithThunk(courseId);
  };

  render() {
    const { currentPosts, currentComments } = this.props.posts;
    console.log("render commens", this.props.posts);
    return (
      <>
      {console.log("comments-->",currentPosts.length,currentComments.length )}
        {/* <Form
          className="mt-1 ask-form border pb-5 px-3 shadow "
          onSubmit={(e) => this.askQuestion(e)}
        >
          <Form.Control
            as="textarea"
            rows={4}
            className="border-0 noManualResize "
            placeholder="Ask here to share with learners,experts & others"
            onChange={(e) =>
              this.setState({
                message: {
                  text: e.currentTarget.value,
                },
              })
            }
            value={this.state.message.text}
          ></Form.Control>

          <Button className=" float-right mt-1 py-0" type="submit">
            Ask
          </Button>
        </Form>

        {currentPosts && currentPosts.length>0
          && currentPosts.map((post) => (
            <Card className="CommentCard mt-5 shadow">
                                             
              <Card.Header
                className="d-flex m-0"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <Avatar
                  src={post.user.profilePic}
                  className="navbar-logo m-0 mt-2  mr-2 p-0 d-inline"
                />
                <div>
                  {" "}
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    className="d-block ml-1 mb-0 p-0 "
                  >
                    {post.user.name} {post.user.surname}
                  </p>
                  {post.user.profession ? (
                    <p
                      style={{ fontSize: "14px" }}
                      className="d-block ml-1 mb-0 p-0 "
                    >
                      {post.user.profession}
                    </p>
                  ) : (
                    <p
                      style={{ fontSize: "12px" }}
                      className="d-block ml-1 mb-0 p-0  text-muted"
                    >
                      {" "}
                      Learner
                    </p>
                  )}
                  <p
                    style={{ fontSize: "12px" }}
                    className="d-block ml-1 mb-0 p-0 text-muted "
                  >
                    {" "}
                    {formatDistance(parseISO(post.createdAt), new Date(), [
                      { addSuffix: false },
                    ])}
                  </p>
                </div>
				{this.props.me.me._id === post.user._id && 
                <div className=" ml-auto a-tags  three-dots-wrapper">
                  {" "}
				 
								 
								 <DropdownButton variant="Secondary"
								 title={ <BsThreeDots style={{ fontSize: "18px" }} />}
								 >
								 <Dropdown.Item as="button" style={{ fontSize: "14px" }}  onClick={()=>this.deletePost(post._id)}>

									Delete your post
								 </Dropdown.Item>
								 <Dropdown.Item as="button"style={{ fontSize: "14px" }}  onClick={()=>this.setState({modifyPost:true})}>

									Edit your post
								 </Dropdown.Item>
								 </DropdownButton>
									
					
                
                </div>}
              </Card.Header>
              <Card.Body>
                <Card.Title>

                  <div className="pb-3 general-font">
					  {this.state.modifyPost ? 
                    <Form.Control
                      as="textarea"
                      rows={2}
					  style={{border:"none"}}
                      className=" pb-2 px-3  "
                      placeholder={post.text}
                      value={this.state. modifiedMessage.text}
                      onKeyDown={(e) => this.handleModify(e, post._id)}
                      onChange={(e) =>
                        this.setState({
                         modifiedMessage: {
                            text: e.currentTarget.value,
                          },
                        })
                      }
                    ></Form.Control>:<p className=" general-font">{post.text}</p>}
                  </div>
                 {post.likes.length >0 && <p className="text-muted general-font"> {post.likes.length} Likes</p>}
                  <hr></hr>
                  <div className="d-flex align-items-start">

				  { post.likes.find( like => like===this.props.me.me._id)?
                   <Button
                      className="LikeButton  "
                      onClick={()=>this.unlikePost(post._id)}
                      size="sm"
                    >
                      <AiTwotoneLike className="mr-2" />
                      UnLike
                    </Button>: <Button
                      className="LikeButton  "
                      onClick={()=>this.likePost(post._id)}
                      size="sm"
                    >
                      <BiLike className="mr-2" />
                      Like
                    </Button>}

					{post.comments.length>0 ?
                    <Button
                      className="LikeButton mr-auto"
                      onClick={() => this.seeAnswers(post._id)}
                      size="sm"
                    >
                      <BiCommentDetail className="mr-2" />
                  	See answers({post.comments.length}) 
                    </Button>: <Button
                      className="LikeButton mr-auto"
                      onClick={() => this.seeAnswers(post._id)}
                      size="sm"
                    >
                      <BiCommentDetail className="mr-2" />
                  	Be the first one to answer
                    </Button>}
                  </div>

                
                </Card.Title>
                <Card.Text>
                  <div className="d-flex">
                    <Avatar
                      src=""
                      className="navbar-logo m-0 mr-2 mt-1 p-0 d-inline"
                    />

                    <Form.Control
                      as="textarea"
                      rows={2}
                      className=" border pb-2 px-3  "
                      placeholder="Add your answer here"
                      value={this.state.comment.text}
                      onKeyDown={(e) => this.handleChange(e, post._id)}
                      onChange={(e) =>
                        this.setState({
                          comment: {
                            text: e.currentTarget.value,
                          },
                        })
                      }
                    ></Form.Control>
                  </div>

                  {currentComments && currentComments.length > 0
                    && currentComments.map(
                      (comment) =>
                        comment.post === post._id && (
                          <div
                            className={
                              this.state.commentShow
                                ? "mt-4 main-comments d-block "
                                : "mt-4 main-comments d-none "
                            }
                          >
                            <div className="d-flex">
                              <Avatar
                                src={comment.user.profilePic}
                                className="navbar-logo m-0 mt-2  mr-2 p-0 d-inline"
                              />
                              <div>
                                {" "}
                                <p
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                  className="d-block ml-1 mb-0 p-0 "
                                >
                                  {comment.user.name} {comment.user.surname}
                                </p>
                                {comment.user.profession ? (
                                  <p
                                    style={{ fontSize: "14px" }}
                                    className="d-block ml-1 mb-0 p-0 "
                                  >
                                    {comment.user.profession}
                                  </p>
                                ) : (
                                  <p
                                    style={{ fontSize: "12px" }}
                                    className="d-block ml-1 mb-0 p-0  text-muted"
                                  >
                                    {" "}
                                    Learner
                                  </p>
                                )}
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="d-block ml-1 mb-0 p-0 text-muted "
                                >
                                  {" "}
                                  {formatDistance(
                                    parseISO(comment.createdAt),
                                    new Date(),
                                    [{ addSuffix: false }]
                                  )}{" "}
                                  ago
                                </p>
                              </div>

							  {this.props.me.me._id === post.user._id && 
							  <div className=" ml-auto a-tags  three-dots-wrapper">
                  {" "}
				 
								 
								 <DropdownButton variant="Secondary"
								 title={ <BsThreeDots style={{ fontSize: "18px" }} />}
								 >
								 <Dropdown.Item as="button" style={{ fontSize: "14px" }}  onClick={()=>this.deletePost(post._id,comment._id)}>

									Delete your comment
								 </Dropdown.Item>
								 <Dropdown.Item as="button"style={{ fontSize: "14px" }}  onClick={()=>this.setState({modifyComment:true})}>

									Edit your comment
								 </Dropdown.Item>
								 </DropdownButton>
									
					
                
                </div>}
                            </div>
                            <div className="pb-3 mt-2 general-font">
							{this.state.modifyComment? 
                    <Form.Control
                      as="textarea"
                      rows={2}
					  style={{border:"none"}}
                      className=" pb-2 px-3  "
                      placeholder={comment.text}
                      value={this.state. modifiedComment.text}
                      onKeyDown={(e) => this.handleModifyComment(e, post._id,comment._id)}
                      onChange={(e) =>
                        this.setState({
                         modifiedComment: {
                            text: e.currentTarget.value,
                          },
                        })
                      }
                    ></Form.Control>:<p className=" general-font">{comment.text}</p>}
                            </div>
                            <Button
                              className="LikeButton  "
                              //  onClick={()=>this.likePost(postId)}
                              size="sm"
                            >
                              Like
                            </Button>
                            <Button
                              className="LikeButton  "
                              //  onClick={()=>this.likePost(postId)}
                              size="sm"
                            >
                              Reply
                            </Button>

                            <p className="text-muted general-font d-inline">
                              {" "}
                              | 2 Likes
                            </p>
                          </div>
                        )
                    )}
                </Card.Text>
              </Card.Body>
            </Card>
          ))} */}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
