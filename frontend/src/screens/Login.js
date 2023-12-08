import React, { useState } from "react";
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios for HTTP requests
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Login = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/login', formData,{
      withCredentials:true
    }).then((res)=>{
        console.log('Login successful:',res.data);
        dispatch(authActions.login())
        navigate("/")

      }).catch((err)=>{
        console.error('Login error:', err);
        navigate("/SignUp")

      })

  };

  return (
    <div>
      <Navbar/>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form-box">
          <h2>Login</h2>
          <div className="input-field">
            <label>Enter your email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Enter your password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" >Log In</button>
          <div className="register">
            <p>
              Don't have an account? <Link to="/Signup">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
