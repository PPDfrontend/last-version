import React, { useState, useEffect, useRef } from 'react';
import './Home.css'; 
import doctorImage from '../assets/doctor.png'; 
import { Link, useNavigate } from 'react-router-dom';
import groupimage from '../assets/group_profiles.png'; 
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';
import axios from 'axios';
import Header from '../Component/Header-home';

function Home2() {
  const [specialistInput, setSpecialistInput] = useState('');
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [showSpecialistOptions, setShowSpecialistOptions] = useState(false);
  
  const [locationInput, setLocationInput] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showLocationOptions, setShowLocationOptions] = useState(false);

  
  const specialistDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  
  const specialists = [
    'All Doctors', 
    'Cardiologie', 
    'Dermatologie',
    'Neurologie', 
    'Pédiatrie',
    'Médecine Générale',
    'Gynécologie-Obstétrique', 
    'Radiologie',
    'Orthopédie',
    'ORL',
    'Urologie',
    'Ophtalmologie',
    'Psychiatrie',
    'Chirurgie Générale'
  ];

  const locations = [
  'Algiers',
  'Annaba',
  'Batna',
  'Blida',
  'Béjaïa',
  'Constantine',
  'Djelfa',
  'Guelma',
  'Jijel',
  "M'Sila",
  'Mila',
  'Médéa',
  'Oran',
  'Relizane',
  'Sidi Bel Abbès',
  'Skikda',
  'Tizi Ouzou',
  'Tlemcen'
];

  const doctors = [
    { id: 31, name: 'Dr. Nassim Benkhaled', specialty: 'Cardiologie', available: true, gender: 'male', location: 'Algiers' },
    { id: 32, name: 'Dr. Imane Zerrouki', specialty: 'Dermatologie', available: true, gender: 'female', location: 'Algiers' },
    { id: 33, name: 'Dr. Khaled Bouchareb', specialty: 'Neurologie', available: true, gender: 'male', location: 'Algiers' },
    { id: 34, name: 'Dr. Meriem Chaouch', specialty: 'Pédiatrie', available: true, gender: 'female', location: 'Algiers' },
    { id: 35, name: 'Dr. Riad Saadi', specialty: 'Médecine Générale', available: true, gender: 'male', location: 'Algiers' },
    { id: 36, name: 'Dr. Sara Gacem', specialty: 'Gynécologie-Obstétrique', available: true, gender: 'female', location: 'Algiers' },
    { id: 37, name: 'Dr. Lina Harbi', specialty: 'Radiologie', available: true, gender: 'female', location: 'Algiers' },
    { id: 38, name: 'Dr. Amine Bouabdellah', specialty: 'Radiologie', available: true, gender: 'male', location: 'Algiers' }
  ];

  const getDoctorImage = (name) => {
    const lowerName = name.toLowerCase();
    const femaleDoctors = ['imane zerrouki', 'meriem chaouch', 'sara gacem', 'lina harbi'];
    for (const femaleDoctor of femaleDoctors) {
      if (lowerName.includes(femaleDoctor.toLowerCase())) {
        return femaleDoctorImage;
      }
    }
    return maleDoctorImage;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (specialistDropdownRef.current && !specialistDropdownRef.current.contains(event.target)) {
        setShowSpecialistOptions(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSpecialistInput = (e) => {
    const value = e.target.value;
    setSpecialistInput(value);
    const filtered = specialists.filter(specialist => 
      specialist.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSpecialists(filtered);
    setShowSpecialistOptions(true);
  };

  const handleLocationInput = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    const filtered = locations.filter(location => 
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setShowLocationOptions(true);
  };

  const navigate = useNavigate();

  return (
    <>
      <Header/>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className='title'>Quality Healthcare Just One <br />Tap Away</h1>
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
              <img src={groupimage} alt="Group of doctors" />
            </div>
          </div>
        </section>

        <section className="quick-search-section">
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

              <Link 
                to={`/all?specialist=${encodeURIComponent(specialistInput)}&location=${encodeURIComponent(locationInput)}`}
                className="search-button1"
              >
                Search
              </Link>
            </div>
          </div>
        </section>

        <section className="featured-doctors-section">
          <h2>Suggestion</h2>
          <p className="paragraph">Explore our list of trusted doctors and book your appointment free.</p>
          <div className="doctors-grid1">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card1">
                  <img 
                    src={getDoctorImage(doctor.name)} 
                    alt={`Doctor ${doctor.name}`} 
                    className="doctor-img" 
                  />
                  <h3>{doctor.name}</h3>
                  <p>Specialty: {doctor.specialty}</p>
                  <p>Location: {doctor.location}</p>
                  <button 
                    className="book-doctor-btn"
                    onClick={() => navigate(`/Booking/${doctor.id}`)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <div className="no-doctors-message">No doctors available at the moment.</div>
            )}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content1">
            <p className="copyright1">
              Copyright © 2025 TABIBII - All Right Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home2;