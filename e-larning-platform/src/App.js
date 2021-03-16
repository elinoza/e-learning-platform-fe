import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import myLearning from './components/Me/myLearning';
import NavBar from './components/Navbar/NavBar';


import { withRouter } from "react-router-dom";


function App(props) {
  return (
 
      <Router>
        
      {props.history.location.pathname !== "/" && props.history.location.pathname  !== "/register"  &&  <NavBar/>}
      {console.log(props.history.location.pathname)}
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/me" component={myLearning} />
      <Route exact path="/learn" component={Learn} />
      
      
      </Router>
   
 
  );
}

export default withRouter(App);
