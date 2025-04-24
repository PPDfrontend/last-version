import React, { useState, useEffect, useRef } from 'react';
import './Home.css'; 
import doctorImage from '../assets/doctor.png'; 
import { Link, useNavigate } from 'react-router-dom';
import groupimage from '../assets/group_profiles.png'; 
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';


function Home() {
  const [specialistInput, setSpecialistInput] = useState('');
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [showSpecialistOptions, setShowSpecialistOptions] = useState(false);
  
  const [locationInput, setLocationInput] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  
  // Create refs for dropdown containers
  const specialistDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  
  // Sample data for specialists and locations
  const specialists = [
    "Cardiologist", 
    "Dermatologist", "Neurologist", "Nephrologist", 
    "Pediatrician", "Psychiatrist", 
    "Orthopedic", "Ophthalmologist", 
    "Generalist", "Dentist"
  ];
  
  const locations = [
   'Algiers',
    'Oran',
    'Constantine',
    'Annaba',
    'Blida',
    'Batna',
    'Djelfa',
    'Sétif',
    'Sidi Bel Abbès',
    'Biskra'
  ];
  
  // Initialize filtered lists
  useEffect(() => {
    setFilteredSpecialists(specialists);
    setFilteredLocations(locations);
  }, []);
  
  // Add click outside event listener
  useEffect(() => {
    function handleClickOutside(event) {
      // Close specialist dropdown if click is outside
      if (specialistDropdownRef.current && !specialistDropdownRef.current.contains(event.target)) {
        setShowSpecialistOptions(false);
      }
      
      // Close location dropdown if click is outside
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationOptions(false);
      }
    }
    
    // Add event listener when components mount
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleSpecialistInput = (e) => {
    const value = e.target.value;
    setSpecialistInput(value);
    
    // Filter specialists that start with the input value
    const filtered = specialists.filter(specialist => 
      specialist.toLowerCase().startsWith(value.toLowerCase())
    );
    
    setFilteredSpecialists(filtered);
    setShowSpecialistOptions(true);
  };
  
  const handleLocationInput = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    
    // Filter locations that start with the input value
    const filtered = locations.filter(location => 
      location.toLowerCase().startsWith(value.toLowerCase())
    );
    
    setFilteredLocations(filtered);
    setShowLocationOptions(true);
  };

  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/all');
  };

  return (
    <>
      <div className="hero-container">
        
        <div className="hero-content">
          <h1 className='title'>Quality Healthcare Just One <br></br>Tap Away</h1>

          <p className="hero-text">
          Explore our list of trusted doctors and book your appointment free.  
          </p>
          <Link to="/all" className="book-button1">
            Book appointment <span className="arrow">→</span>
          </Link>
        </div>

        <div className="hero-image">
          <img src={doctorImage} alt="Doctor with stethoscope" />
        </div>
        <div className="group-image">
          <img src={groupimage} alt="group image" />
        </div>
      </div>
      
      {/* Quick Search Section */}
      <div className="quick-search-container">
        <h2 className="quick-search-title">Looking for a Doctor</h2>
        <div className="search-inputs">
          <div className="search-field-container" ref={specialistDropdownRef}>
            <input 
              type="text" 
              className="search-field" 
              placeholder="Doctors Specialist"
              value={specialistInput}
              onChange={handleSpecialistInput}
              onFocus={() => setShowSpecialistOptions(true)}
            />
            <span className="search-icon">⌕</span>
            {showSpecialistOptions && (
              <div className="dropdown-options scrollable">
                {filteredSpecialists.map((specialist, index) => (
                  <div 
                    key={index} 
                    className="dropdown-item"
                    onClick={() => {
                      setSpecialistInput(specialist);
                      setShowSpecialistOptions(false);
                    }}
                  >
                    {specialist}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="search-field-container" ref={locationDropdownRef}>
            <input 
              type="text" 
              className="search-field" 
              placeholder="Location" 
              value={locationInput}
              onChange={handleLocationInput}
              onFocus={() => setShowLocationOptions(true)}
            />
            <span className="search-icon">⌕</span>
            {showLocationOptions && (
              <div className="dropdown-options scrollable">
                {filteredLocations.map((location, index) => (
                  <div 
                    key={index} 
                    className="dropdown-item"
                    onClick={() => {
                      setLocationInput(location);
                      setShowLocationOptions(false);
                    }}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div 
            className="search-button1"
            onClick={() => {
              window.location.href = `/all?specialist=${encodeURIComponent(specialistInput)}&location=${encodeURIComponent(locationInput)}`;
            }}
          >
            Search
          </div>
        </div>
      </div>
      <div className="featured-doctors-section">
        <h2>Suggestion</h2>
        <p className='paragraph'>Explore our list of trusted doctors and book your appointment free.</p>
        <div className="doctors-grid1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="doctor-card1">
              <img 
                src={item % 2 === 0 ? maleDoctorImage : femaleDoctorImage} 
                alt={`Doctor ${item}`} 
                className="doctor-img" 
              />
              <h3>Dr. Example Name</h3>
              <p>Specialty: {item % 2 === 0 ? "Cardiologist" : "Dermatologist"}</p>
              <p>Location: {item % 3 === 0 ? "Alger" : "Constantine"}</p>
              <button className="book-doctor-btn">Book Appointment</button>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content1">
          <p className="copyright1">Copyright © 2025 TABIBII - All Right Reserved.</p>
        </div>
      </footer>
    </>
  );
}


export default Home;
