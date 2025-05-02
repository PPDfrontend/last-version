import React from "react";
import "./MyAcc.css";
import { Link } from "react-router-dom";
import Header from "../Component/Header-home";
import profilePic from "../assets/myacc-pic.png"; // ✅ Adjusted image path

function MyAcc() {
  
  const user = {
    fullName: "User Name",
    email: "user@example.com",
    phone: "+000 000 0000",
    gender: "Not specified",
    birthday: "YYYY-MM-DD",
  };

  return (
    <>
      <Header />
      <div className="account-container">
        <div className="profile-header">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" />
          </div>
          <h2>{user.fullName}</h2>
        </div>

        <div className="section">
          <h3>Contact Information</h3>
          <p><strong>Email id:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="section">
          <h3>Basic Information</h3>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Birthday:</strong> {user.birthday}</p>
        </div>

        <div className="buttons">
          <button className="edit-btn">Edit</button>
          <Link to="/Login">
            <button className="save-btn">Log Out</button>
          </Link>
        </div>
        
      </div>
    </>
  );
}

export default MyAcc;