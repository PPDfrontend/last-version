import React from 'react';
import about_image from '../assets/about_image.png';
import Header from "../Component/Header-home";
import './About.css';

const About2 = () => {
  return (
<>
<Header/>
    <div className="about-container">
      <div className="about-us-section">
        <h2 className="section-title">ABOUT <span className="highlight">US</span></h2>
        
        <div className="about-content">
          <div className="about-image">
            <img src={about_image} alt="Healthcare professionals" />
          </div>
          
          <div className="about-text">
            <p>
              Welcome to Tabib, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently. At 
              Tabib, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments In 
              Algeria And Managing Their Health Records.
            </p>
            
            <p>
              Tabib Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our Platform, 
              Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. Whether You're 
              Booking Your First Appointment Or Managing Ongoing Care, Tabib Is Here To Support You Every Step Of The 
              Journey.
            </p>
            
            <div className="vision-section">
              <h3>Our Vision</h3>
              <p>
                Our Vision At Tabib Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The Gap 
                Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When You 
                Need It.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="choose-us-section">
        <h2 className="section-title">WHY <span className="highlight">CHOOSE US</span></h2>
        
        <div className="benefits-container">
          <div className="benefit-card">
            <h3>EFFICIENCY:</h3>
            <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
          </div>
          
          <div className="benefit-card">
            <h3>CONVENIENCE:</h3>
            <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
          
          <div className="benefit-card">
            <h3>PERSONALIZATION:</h3>
            <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
      </div>
      <footer className="footer4">
        <div className="footer-content4">
          <p className="copyright4">Copyright © 2025 TABIBII - All Right Reserved.</p>
        </div>
      </footer>
    </div>
</>
  );
};

export default About2;