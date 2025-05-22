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
              Welcome to Tabib, your trusted partner in managing your healthcare needs conveniently and efficiently. At Tabib, we understand the challenges individuals face when it comes to scheduling doctor appointments in Algeria and managing their health records.
            </p>
            
            <p>
              Tabib is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Tabib is here to support you every step of the journey.
            </p>
            
            <div className="vision-section">
              <h3>Our Vision</h3>
              <p>
                Our vision at Tabib is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
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
            <p>Streamlined Appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          
          <div className="benefit-card">
            <h3>CONVENIENCE:</h3>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          
          <div className="benefit-card">
            <h3>PERSONALIZATION:</h3>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
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