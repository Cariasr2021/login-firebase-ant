import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css'
import NavBar from "./components/NavBar";


function App() {
  return (
    
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route 
            path="/" 
            element={<h3>Inicio</h3>}
          />
          <Route 
            path="/login" 
            element={<h3>Login...</h3>}
          />
          <Route 
            path="/admin" 
            element={<h3>Admin...</h3>}
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
