import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import 'antd/dist/antd.css';
import './App.css'
import NavBar from "./components/NavBar";
import { auth, db } from './firebase';
import { useEffect, useState } from "react";


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      console.log(user)
      if(user) {
        setFirebaseUser(user)
      } else{
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser !== false ? (
    
    <Router>
      <div className="App">
        <NavBar firebaseUser={firebaseUser} />
        <Routes>
          <Route 
            path="/" 
            element={<h3>Inicio</h3>}
          />
          <Route 
            path="/login" 
            element={<Login />}
          />
          <Route 
            path="/admin" 
            element={<Admin />}
          />
        </Routes>
      </div>
    </Router>
  ): (
    <p>Cargando ...</p>
  )
}

export default App;
