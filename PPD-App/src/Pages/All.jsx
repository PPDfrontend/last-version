import React, { useState, useEffect, useRef } from 'react';
import './All.css';
import { useSearchParams, Link } from 'react-router-dom';
// Import your placeholder images - replace these paths with your actual image paths
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';

const All = () => {
  const [searchParams] = useSearchParams();
  
  // State for tracking dropdown visibility 
  const [specialistDropdownOpen, setSpecialistDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  
  // State for selected filters
  const [selectedSpecialist, setSelectedSpecialist] = useState('All Doctors');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  
  // Refs for dropdown containers
  const specialistDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  // Add a ref to track the scroll position
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
  
  // Save scroll position when filters change
  useEffect(() => {
    // Save current scroll position
    scrollPositionRef.current = window.scrollY;
    
    // Restore scroll position after a short delay
    const timer = setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [selectedSpecialist, selectedLocation]);

  // Sample data
  const specialists = [
    'All Doctors', 
    'Cardiologist', 
    'Dentist',
    'Dermatologist', 
    'Neurologist',
    'Nephrologist',
    'Pediatrician', 
    "Psychiatrist",
    'Orthopedic',
    'Ophthalmologist',
    'Generalist'
  ];
  
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

  const doctors = [
    { id: 1, name: 'Dr. Richard James', specialty: 'General physician', available: false, gender: 'male', location: 'Algiers' },
    { id: 2, name: 'Dr. Sarah Miller', specialty: 'Cardiologist', available: true, gender: 'female', location: 'Oran' },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Dermatologist', available: true, gender: 'female', location: 'Constantine' },
    { id: 4, name: 'Dr. John Smith', specialty: 'Neurologist', available: true, gender: 'male', location: 'Annaba' },
    { id: 5, name: 'Dr. Jennifer Lee', specialty: 'Pediatrician', available: true, gender: 'female', location: 'Blida' },
    { id: 6, name: 'Dr. Michael Brown', specialty: 'General physician', available: true, gender: 'male', location: 'Batna' },
    { id: 7, name: 'Dr. David Clark', specialty: 'Orthopedist', available: true, gender: 'male', location: 'Sétif' },
    { id: 8, name: 'Dr. Robert Taylor', specialty: 'Ophthalmologist', available: false, gender: 'male', location: 'Djelfa' },
    { id: 9, name: 'Dr. Richard James', specialty: 'General physician', available: false, gender: 'male', location: 'Algiers' },
    { id: 10, name: 'Dr. Sarah Miller', specialty: 'Cardiologist', available: true, gender: 'female', location: 'Oran' },
    { id: 11, name: 'Dr. Emily Wilson', specialty: 'Dermatologist', available: true, gender: 'female', location: 'Constantine' },
    { id: 12, name: 'Dr. John Smith', specialty: 'Neurologist', available: true, gender: 'male', location: 'Annaba' },
    { id: 13, name: 'Dr. Jennifer Lee', specialty: 'Pediatrician', available: true, gender: 'female', location: 'Blida' },
    { id: 14, name: 'Dr. Michael Brown', specialty: 'General physician', available: true, gender: 'male', location: 'Batna' },
    { id: 15, name: 'Dr. David Clark', specialty: 'Orthopedist', available: true, gender: 'male', location: 'Sétif' },
    { id: 16, name: 'Dr. Robert Taylor', specialty: 'Ophthalmologist', available: false, gender: 'male', location: 'Djelfa' },
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

  return (
    <div className="all-doctors-container">
      <h2 className="browse-title">Browse through the doctors specialist.</h2>
      
      <div className="doctors-section">
        <div className="filters-sidebar">
          
          {/* Filter dropdown section */}
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
          {filteredDoctors.map(doctor => (
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
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <p className="doctor-location">{doctor.location}</p>
                </div>
              </div>
            </Link>
          ))}
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