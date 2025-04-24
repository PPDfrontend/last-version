import React from 'react';
import contact_image from '../assets/contact_image.png';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">CONTACT <span className="highlight">US</span></h2>
      
      <div className="contact-content">
        <div className="contact-image">
          <img src={contact_image} alt="Doctor examining a child patient" />
        </div>
        
        <div className="contact-info">
          <h3 className="team-title">OUR TEAM</h3>
          
          <address className="address-info">
            Rue 33 Nouvelle Ville<br />
            Constantine, Algeria
          </address>
          
          <div className="contact-details">
            <p className="tel">Tel: (+213)505079081</p>
            <p className="email">Email: Dev.team@gmail.com</p>
          </div>
          
          <p className="learn-more">Learn more about our team.</p>
          
          <button className="explore-button">Explore</button>
        </div>
      </div>
      
      <footer className="footer5">
        <div className="footer-content5">
          <p className="copyright5">Copyright © 2025 TABIBII - All Right Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;