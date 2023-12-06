import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import img from "../assets/pic.jpg"
const UserHome = () => {
  return (
    <div>
        <Navbar/>
        <div className="home-wrapper" style={{
          display:"flex",
          justifyContent:"center",
          fontSize:"larger"
        }}>
          
          <img src={img} alt="" />
        </div>
    </div>
  )
}

export default UserHome