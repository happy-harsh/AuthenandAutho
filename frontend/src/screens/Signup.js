import React, { useState} from "react";
import axios from 'axios';
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import { useNavigate , Link} from "react-router-dom";
const Signup = () => {
  
  const [input, setInput]= useState({
    email:"",
    location:"",
    password:""
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInput({...input,[name]:value})


  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Use formData state for form submission or other actions
    // console.log(input);
    try {
      await axios.post('http://localhost:5000/signup', input,{
        withCredentials:true
      }).then((res)=>{
        alert("user created successfully")
        navigate("/Login")

      }).catch((err)=>{
        console.log(err);
      })

  } catch (error) {
      console.error('Error creating user:', error.response.data);
  }
};

  return (
    <div>
      <Navbar/>
      <div class="wrapper">
        <form action="#" className="form-box">
          <h2>SignUp</h2>
          <div class="input-field">
            <label>Enter your email</label>
            <input type="text" required name="email" value={input.email} onChange={handleInputChange}/>
          </div>
          <div class="input-field">
            <label>Enter your Location</label>
            <input type="text" required name="location" value={input.location} onChange={handleInputChange}/>
          </div>
          <div class="input-field">
            <label>Create a password</label>
            <input type="password" required name="password" value={input.password} onChange={handleInputChange} />
          </div>
          <div class="button-box">
          <button type="submit" onClick={handleSubmit}>Sign Up</button>
          </div>
          <div class="register">
            <p>
              Already have an account? <Link to="/Login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
