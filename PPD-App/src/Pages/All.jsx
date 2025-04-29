import React, { useState, useEffect, useRef } from 'react';
import './All.css';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';

const All = () => {
  const [searchParams] = useSearchParams();
  const [specialistDropdownOpen, setSpecialistDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState('All Doctors');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const specialistDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Initialize filters from URL parameters
  useEffect(() => {
    const specialist = searchParams.get('specialist');
    const location = searchParams.get('location');
    
    if (specialist) {
      setSelectedSpecialist(specialist);
    }
    if (location) {
      setSelectedLocation(location);
    }
  }, [searchParams]);

  // Fetch doctors from database
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/doctors');
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors. Please try again later.');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Save scroll position when filters change
  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
    const timer = setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 10);
    return () => clearTimeout(timer);
  }, [selectedSpecialist, selectedLocation]);

  // Specialist options
  const specialists = [
    'All Doctors', 
    'Cardiologist', 
    'Dentist',
    'Dermatologist', 
    'Neurologist',
    'Nephrologist',
    'Pediatrician', 
    'Psychiatrist',
    'Orthopedic',
    'Ophthalmologist',
    'Generalist'
  ];
  
  // Location options
  const algerianCities = [
    'All Locations',
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

  // Function to get the appropriate image based on gender
  const getDoctorImage = (gender) => {
    return gender === 'female' ? femaleDoctorImage : maleDoctorImage;
  };
  
  // Filter doctors based on selection
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialist === 'All Doctors' || 
      doctor.specialty.toLowerCase().includes(selectedSpecialist.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || 
      doctor.location === selectedLocation;
    return matchesSpecialty && matchesLocation;
  });

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (specialistDropdownRef.current && !specialistDropdownRef.current.contains(event.target)) {
        setSpecialistDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div className="loading-message">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="all-doctors-container">
      <h2 className="browse-title">Browse through the doctors specialist.</h2>
      
      <div className="doctors-section">
        <div className="filters-sidebar">
          <div className="filters-wrapper">
            <div className="filter-row">
              {/* Specialist Dropdown */}
              <div className="filter-dropdown" ref={specialistDropdownRef}>
                <div 
                  className="filter-dropdown-header" 
                  onClick={() => setSpecialistDropdownOpen(!specialistDropdownOpen)}
                >
                  <span>{selectedSpecialist}</span>
                  <span className={`dropdown-arrow ${specialistDropdownOpen ? 'open' : ''}`}>▼</span>
                </div>
                {specialistDropdownOpen && (
                  <div className="dropdown-content">
                    {specialists.map((specialist, index) => (
                      <div 
                        key={index} 
                        className={`dropdown-item ${selectedSpecialist === specialist ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedSpecialist(specialist);
                          setSpecialistDropdownOpen(false);
                        }}
                      >
                        {specialist}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="filter-row">
              {/* Location Dropdown */}
              <div className="filter-dropdown" ref={locationDropdownRef}>
                <div 
                  className="filter-dropdown-header" 
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                >
                  <span>{selectedLocation}</span>
                  <span className={`dropdown-arrow ${locationDropdownOpen ? 'open' : ''}`}>▼</span>
                </div>
                {locationDropdownOpen && (
                  <div className="dropdown-content">
                    {algerianCities.map((city, index) => (
                      <div 
                        key={index} 
                        className={`dropdown-item ${selectedLocation === city ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLocation(city);
                          setLocationDropdownOpen(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`doctors-grid ${(selectedSpecialist !== 'All Doctors' || selectedLocation !== 'All Locations') ? 'filtered' : ''}`}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <Link 
                key={doctor.id} 
                to={`/booking/${doctor.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="doctor-card" style={{ cursor: 'pointer' }}>
                  <div className="doctor-image-container">
                    <img 
                      src={getDoctorImage(doctor.gender)} 
                      alt={`Dr. ${doctor.name}`}
                      className="doctor-image" 
                    />
                  </div>
                  <div className="doctor-info">
                    <div className={`availability ${doctor.available ? 'available' : 'unavailable'}`}>
                      <span className="availability-dot"></span>
                      <span className="availability-text">
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <h3 className="doctor-name">Dr. {doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-location">{doctor.location}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-doctors-message">
              No doctors found matching your criteria.
            </div>
          )}
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <p className="copyright2">Copyright © 2025 TABIBII - All Right Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default All;