import React,{ useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route,Link  } from "react-router-dom";
import axios from 'axios';
import Loading  from "./Loading";
 
import Error from './Error'
import Cookies from 'universal-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("")
  const [message, setMessage] = useState(null);
  const cookies = new Cookies();



const submitHandler=async(e)=>{
    e.preventDefault();

   console.log(email,password);
   try {
    const config={
        headers: { 'Content-Type': 'application/json'}
    }
   setLoading(true);
   const {data}=await axios.post("http://localhost:3000/api/users/login",{email,password},config );
   console.log(data);
   setMessage("Login has done successfully");
   localStorage.setItem("userInfo",JSON.stringify(data));
   cookies.set( data);
   setLoading(false);
} catch (error) {
    console.log("error"+error);
    setLoading(false);
    setError(error.response.data.message);
   }
}

  return (
    <>
      <div className="container my-4 p-3">
        <h2 className="text-center text-success">Login </h2>
        {message && <Error > {message}</Error>}
        {error && <Error> {error}</Error>}
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter the email address"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button type="submit" className="btn btn-outline-warning">
            Submit
          </button>
        </form>
        <div className="row my-4">
            <div className="col">

            New User ? <Link to="/register" className="text-decoration-none text-danger">Register Here</Link></div>
            </div>
      </div>
    </>
  );
};

export default Login;
