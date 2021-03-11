import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';

function App(props) {
  return (
    <div className="App">
      <Router>
      {props.location.pathname !== "/" || props.location.pathname !== "/register"  &&  <NavBar/>}
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/home" component={Home} /> */}
      </Router>
   
    </div>
  );
}

export default App;
