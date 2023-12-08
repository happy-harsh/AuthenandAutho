import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn)
  const dispatch = useDispatch();

 const [loggedInUser, setLoggedInUser] = useState({});
  

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user", { withCredentials: true });
      setLoggedInUser(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  if (isLoggedIn) {
    fetchUser();
  }
}, [isLoggedIn]); // Add isLoggedIn as a dependency for useEffect

  const handleLogoutUser = async () => {
    await axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        dispatch(authActions.logout());
        
        navigate("/login");
      })
      .catch((err) => {
        console.log("unable to logout ");
      });
  };

  return (
    <div>
      <div className="header-box">
        <div className="name-box">
          <Link to="/" alt="">
            Authentication & Authorization
          </Link>
        </div>
        <div className="navLink-box">
          <ul>
            {!isLoggedIn && <>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                <li>
                  <Link to="/Signup">SignUp</Link>
                </li></>}
            {isLoggedIn && 
              <>
                            <li>
                  <h5>Welcome {loggedInUser.email} </h5>
                </li>
                            <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              <li>
                <button onClick={handleLogoutUser}>Logout</button>
              </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
