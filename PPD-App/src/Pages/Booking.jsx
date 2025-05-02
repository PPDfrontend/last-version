import React, { useState, useEffect } from 'react';
import './Booking.css';
import { CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
// Import your placeholder images
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';
import Header from "../Component/Header-home";

const Booking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('SUN');
  const [selectedTime, setSelectedTime] = useState('9:00 am');
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Booking component rendered with doctorId:", doctorId);

  const days = [
    { id: 'SUN' },
    { id: 'MON' },
    { id: 'TUE'},
    { id: 'WED', },
    { id: 'THU', },
  ];

  const times = [
    '8:00 am',
    '8:30 am',
    '9:00 am',
    '9:30 am',
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
  ];

  // This would typically come from an API call, but for now we'll simulate it with local data
  const doctorsData = [
    { id: 1, name: 'Richard James', specialty: 'General physician', experience: '2 Years', gender: 'male', location: 'Algiers', about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.' },
    { id: 2, name: 'Sarah Miller', specialty: 'Cardiologist', experience: '5 Years', gender: 'female', location: 'Oran', about: 'Dr. Miller specializes in heart conditions and provides expert care for patients with cardiac issues.' },
    { id: 3, name: 'Emily Wilson', specialty: 'Dermatologist', experience: '3 Years', gender: 'female', location: 'Constantine', about: 'Dr. Wilson focuses on skin health and treats various dermatological conditions with the latest approaches.' },
    { id: 4, name: 'John Smith', specialty: 'Neurologist', experience: '7 Years', gender: 'male', location: 'Annaba', about: 'Dr. Smith is dedicated to diagnosing and treating disorders of the nervous system with precision and care.' },
    { id: 5, name: 'Jennifer Lee', specialty: 'Pediatrician', experience: '4 Years', gender: 'female', location: 'Blida', about: 'Dr. Lee provides compassionate care for children of all ages, focusing on their health and development.' },
    { id: 6, name: 'Michael Brown', specialty: 'General physician', experience: '6 Years', gender: 'male', location: 'Batna', about: 'Dr. Brown offers comprehensive medical services with a patient-centered approach.' },
    { id: 7, name: 'David Clark', specialty: 'Orthopedist', experience: '8 Years', gender: 'male', location: 'Sétif', about: 'Dr. Clark specializes in musculoskeletal conditions and offers advanced orthopedic treatments.' },
    { id: 8, name: 'Robert Taylor', specialty: 'Ophthalmologist', experience: '5 Years', gender: 'male', location: 'Djelfa', about: 'Dr. Taylor is dedicated to eye health and provides comprehensive care for vision-related issues.' },
    // Add more entries for doctors 9-16 if needed
  ];

  // Function to get the appropriate image based on gender
  const getDoctorImage = (gender) => {
    return gender === 'female' ? femaleDoctorImage : maleDoctorImage;
  };

  // Fetch doctor details based on ID
  useEffect(() => {
    setLoading(true);
    if (doctorId) {
      console.log("Looking for doctor with ID:", doctorId);
      // Convert doctorId to number since it comes as a string from URL params
      const id = parseInt(doctorId, 10);
      console.log("Converted doctorId to number:", id);
      
      const foundDoctor = doctorsData.find(doc => doc.id === id);
      console.log("Found doctor:", foundDoctor);
      
      if (foundDoctor) {
        setDoctor(foundDoctor);
        setLoading(false);
      } else {
        console.error("Doctor not found with ID:", id);
        setError(`Doctor with ID ${id} not found`);
        setLoading(false);
        // Optional: Navigate back to the doctors list if doctor not found
        // setTimeout(() => navigate('/All2'), 3000);
      }
    } else {
      console.error("No doctorId provided in URL params");
      setError("No doctor ID provided");
      setLoading(false);
    }
  }, [doctorId, navigate]);

  if (loading) {
    return <div className="loading">Loading doctor information...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!doctor) {
    return <div className="error-message">Doctor information not available</div>;
  }

  return (
    <>
      <Header/>
      <div className="booking-container">
        <div className="doctor-profile">
          <div className="doctor-image-container">
            <img 
              src={getDoctorImage(doctor.gender)} 
              alt={doctor.name} 
              className="doctor-image" 
            />
          </div>
          <div className="doctor-info">
            <div className="doctor-header">
              <h2>{doctor.name} <CheckCircle className="verified-icon" size={20} color="#00ACC1" /></h2>
              <div className="doctor-position">
                <span>{doctor.specialty}</span>
                <span className="years-badge">{doctor.experience}</span>
              </div>
            </div>
            
            <div className="about-section">
              <div className="about-header">
                <h3>About</h3>
                <span className="info-icon">ⓘ</span>
              </div>
              <p>{doctor.about}</p>
            </div>
            
            <div className="location">
              <span>Location | </span>
              <span className="location-value">{doctor.location}</span>
            </div>
          </div>
        </div>

        <div className="booking-section">
          <h3>Booking slots</h3>
          
          <div className="days-row">
            {days.map((day) => (
              <div 
                key={day.id}
                className={`day-item ${selectedDay === day.id ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day.id)}
              >
                <div className="day-name">{day.id}</div>
                <div className="day-number">{day.number}</div>
              </div>
            ))}
          </div>

          <div className="times-row">
            {times.map((time) => (
              <div 
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>

          <button className="book-button">Book an appointment</button>
        </div>
        <footer className="footer3">
          <div className="footer-content1">
            <p className="copyright1">Copyright © 2025 TABIBII - All Right Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Booking;