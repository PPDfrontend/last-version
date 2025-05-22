import React, { useState, useEffect, useRef } from 'react';
import './All.css';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';
import Header from "../Component/Header-home";

const All2 = () => {
  const [searchParams] = useSearchParams();
  const [specialistDropdownOpen, setSpecialistDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(
    searchParams.get('specialist') || 'All Doctors'
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get('location') || 'All Locations'
  );
  const [doctors, setDoctors] = useState([
    { id: 31, name: 'Dr. Nassim Benkhaled', specialty: 'Cardiologie', available: true, gender: 'male', location: 'Constantine' },
    { id: 32, name: 'Dr. Imane Zerrouki', specialty: 'Dermatologie', available: true, gender: 'female', location: 'Constantine' },
    { id: 33, name: 'Dr. Khaled Bouchareb', specialty: 'Neurologie', available: true, gender: 'male', location: 'Constantine' },
    { id: 34, name: 'Dr. Meriem Chaouch', specialty: 'Pédiatrie', available: true, gender: 'female', location: 'Constantine' },
    { id: 35, name: 'Dr. Riad Saadi', specialty: 'Médecine Générale', available: true, gender: 'male', location: 'Constantine' },
    { id: 36, name: 'Dr. Sara Gacem', specialty: 'Gynécologie-Obstétrique', available: true, gender: 'female', location: 'Constantine' },
    { id: 37, name: 'Dr. Lina Harbi', specialty: 'Radiologie', available: true, gender: 'female', location: 'Algiers' },
    { id: 38, name: 'Dr. Amine Bouabdellah', specialty: 'Radiologie', available: true, gender: 'male', location: 'Algiers' },
    { id: 39, name: 'Dr. Yasmine Merabet', specialty: 'Orthopédie', available: true, gender: 'female', location: 'Algiers' },
    { id: 40, name: 'Dr. Tarek Sebaa', specialty: 'ORL', available: true, gender: 'male', location: 'Oran' },
    { id: 41, name: 'Dr. Nadia Belkacem', specialty: 'Cardiologie', available: true, gender: 'female', location: 'Oran' },
    { id: 42, name: 'Dr. Selma Kaci', specialty: 'Médecine Générale', available: true, gender: 'female', location: 'Blida' },
    { id: 43, name: 'Dr. Zine Kherbache', specialty: 'Pédiatrie', available: true, gender: 'male', location: 'Blida' },
    { id: 44, name: 'Dr. Hakim Mansouri', specialty: 'Urologie', available: true, gender: 'male', location: 'Batna' },
    { id: 45, name: 'Dr. Rania Lounis', specialty: 'Neurologie', available: true, gender: 'female', location: 'Batna' },
    { id: 46, name: 'Dr. Kamel Zerguine', specialty: 'Ophtalmologie', available: true, gender: 'male', location: 'Annaba' },
    { id: 47, name: 'Dr. Mouna Derbal', specialty: 'Gynécologie-Obstétrique', available: true, gender: 'female', location: 'Annaba' },
    { id: 48, name: 'Dr. Walid Kaci', specialty: 'Dermatologie', available: true, gender: 'male', location: 'Béjaïa' },
    { id: 49, name: 'Dr. Houda Benaissa', specialty: 'Dermatologie', available: true, gender: 'female', location: 'Béjaïa' },
    { id: 50, name: 'Dr. Nabil Benziane', specialty: 'Psychiatrie', available: true, gender: 'male', location: 'Djelfa' },
    { id: 51, name: 'Dr. Amina Ould Ali', specialty: 'ORL', available: true, gender: 'female', location: 'Tizi Ouzou' },
    { id: 52, name: 'Dr. Farid Bouraoui', specialty: 'Chirurgie Générale', available: true, gender: 'male', location: 'Tlemcen' },
    { id: 53, name: 'Dr. Layla Rezig', specialty: 'Orthopédie', available: true, gender: 'female', location: 'Skikda' },
    { id: 54, name: 'Dr. Reda Bendimerad', specialty: 'Radiologie', available: true, gender: 'male', location: 'Sidi Bel Abbès' },
    { id: 55, name: 'Dr. Sabrina Benslama', specialty: 'Pédiatrie', available: true, gender: 'female', location: 'Jijel' },
    { id: 56, name: 'Dr. Karim Gherbi', specialty: 'Médecine Générale', available: true, gender: 'male', location: 'Médéa' },
    { id: 57, name: 'Dr. Fatma Zerhouni', specialty: 'Médecine Générale', available: true, gender: 'female', location: 'Relizane' },
    { id: 58, name: 'Dr. Yassine Aouchiche', specialty: 'Neurologie', available: true, gender: 'male', location: 'Guelma' },
    { id: 59, name: 'Dr. Lamia Salah', specialty: 'Urologie', available: true, gender: 'female', location: "M'Sila" },
    { id: 60, name: 'Dr. Mohamed Benali', specialty: 'Pédiatrie', available: true, gender: 'male', location: 'Mila' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specialistDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    setLoading(false);
  }, []);

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

  const algerianCities = [
    
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

  const getDoctorImage = (name) => {
    const femaleNames = [
      'imane zerrouki', 'meriem chaouch', 'sara gacem', 'lina harbi',
      'yasmine merabet', 'nadia belkacem', 'selma kaci', 'rania lounis',
      'mouna derbal', 'houda benaissa', 'amina ould ali', 'layla rezig',
      'sabrina benslama', 'fatma zerhouni', 'lamia salah'
    ];
    const lowerName = name.toLowerCase();
    return femaleNames.some(fname => lowerName.includes(fname)) ? femaleDoctorImage : maleDoctorImage;
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialist === 'All Doctors' || 
      doctor.specialty === selectedSpecialist;
    const matchesLocation = selectedLocation === 'All Locations' || 
      doctor.location === selectedLocation;
    return matchesSpecialty && matchesLocation;
  });

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return <div className="loading-message">Loading doctors...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <Header />
      <div className="all-doctors-container">
        <h2 className="browse-title">Browse through the doctors specialist.</h2>
        
        <div className="doctors-section">
          <div className="filters-sidebar">
            <div className="filters-wrapper">
              <div className="filter-row">
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
                          onClick={() => {
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
                          onClick={() => {
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
                  to={`/Booking/${doctor.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="doctor-card" style={{ cursor: 'pointer' }}>
                    <div className="doctor-image-container">
                      <img 
                        src={getDoctorImage(doctor.name)} 
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
    </>
  );
};

export default All2;
