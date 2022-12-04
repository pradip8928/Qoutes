import React,{ useState } from 'react'
 import Login from "./Components/Pages/Login"
 import Register from "./Components/Pages/Register"
 import Home from "./Components/Pages/Home"
 import About from "./Components/Pages/About"
import './App.css'
// import {  Routes, Route,Link  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
// import {useHistory} from "react-router-dom"
import {useNavigate} from 'react-router-dom';
// import { , Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'; 

function App() {
  let user=JSON.parse(localStorage.getItem('userInfo'));
  // console.log("user "+user.name);
  // console.log(user);
  // const history = useHistory();
  // const navigate = useNavigate()
  const cookies = new Cookies();
  


  const logOut=()=>{
    console.log("logout is called");
    // localStorage.clear()
    localStorage.removeItem("userInfo");
    // history.push('/register',{replace:true})
    // navigate('/register',{replace:true})

  }
  return (
<>
<Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          
          <Link className="navbar-brand" to="#">
            {" "}
            {user && user.name}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-warning text-bold" aria-current="page" to="/">
                  Moody
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-warning text-bold" aria-current="page" to="/about">
                  About
                </Link>
              </li>
             
            </ul>

{user ?
 <button className="btn btn-outline-warning">
 <Link className="text-decoration-none text-warning "
 onClick={()=>{
   logOut();
 }}
 > Logout</Link>
</button>:
<>
            <button className="me-2 btn btn-outline-success">
              <Link className="text-decoration-none text-success " to="/register"> Register</Link>
            </button>
            <button className="btn btn-outline-warning">
              <Link className="text-decoration-none text-warning " to="/login"> Login</Link>
            </button>
            </>
}
            
           
          
          </div>
        </div>
      </nav>

      
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={( ) => (
            <Home     />
          )} />
        <Route path="/register" exact element={
        <>
        <Home />
        <Register />
        </>
        } />
        <Route path="/login" exact element={
        <>
        <Home />
        <Login />
        </>
        } />
        <Route path="/about" exact element={
        <>
        <About/>
        </>
        } />
        {/* <Route path="/logout" exact  onClick={()=>{localStorage.removeItem("userInfo")
              // history.push('/register',{replace:true});
            }} /> */}
         
        
      </Routes>
    </Router>

</>
  )
}

export default App
