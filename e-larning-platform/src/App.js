import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <div className="App">
    {/* <Login/> */}
    <Register/>
    </div>
  );
}

export default App;
