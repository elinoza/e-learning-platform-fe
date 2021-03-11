import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';
import { withRouter } from "react-router-dom";

function App(props) {
  return (
 
      <Router>
      {props.path !== "/" || props.path !== "/register"  &&  <NavBar/>}
      {/* <NavBar/> */}
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/home" component={Home} /> */}
      </Router>
   
 
  );
}

export default withRouter(App);
