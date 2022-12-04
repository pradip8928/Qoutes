import React, { useState ,useEffect} from "react";
import Error from "./Error";
import Loading from "./Loading";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(name);
    console.log(password);
    console.log(confirmPassword);
    console.log(pic);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:3000/api/users/",
          { name, pic, email, password },
          config
        );
        console.log(data);
        setMessage("Registration has done successfully");
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
        // setError("error  is occured while registering");
      }
    }
  };

  // pic
  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pradip");
      data.append("cloud_name", "dmkdgxmdu");
      fetch("https://api.cloudinary.com/v1_1/dmkdgxmdu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };


  
//   useEffect(() => {
//     const userInfo=localStorage.setItem("userInfo",users );
//     if (userInfo) {

//         navigate('/');
//     }
//   }, [userInfo]);

  return (
    <>
      <div className="container my-4 p-4">
        {error && <Error> {error}</Error>}
        {message && <Error varient="danger"> {message}</Error>}
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <div class="mb-3">
            <label for="formFile" className="form-label">
              Upload Your Profile Picture
            </label>
            <input
              class="form-control"
              type="file"
              accept="image/*"
              id="custom-file"
              
              custom
              multiple 
            //   value={pic}
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
 
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
