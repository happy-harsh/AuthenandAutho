import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Card.css"
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect( () => {
     axios.get('http://localhost:5000/users',{withCredentials:true}) 
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        navigate("/Login")
        
      });
  }, []);

  return (
    <div className="main-container">
      <Navbar/>
    <div className="dashboard-container">
      <h1 >User Dashboard</h1>
      <div className="Card-container">
        {users.map(user => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.email}</h5>
                <p className="card-text">{user.location}</p>
                {/* Add more user information as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
