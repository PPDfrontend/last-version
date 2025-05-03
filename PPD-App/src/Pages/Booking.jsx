
import React, { useState, useEffect } from 'react';
import './Booking.css';
import { CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import maleDoctorImage from '../assets/male-doctor.png'; 
import femaleDoctorImage from '../assets/female-doctor.png';
import Header from "../Component/Header-home";

// List of known female names (lowercase)
const femaleNames = [
  'imane zerrouki', 'meriem chaouch', 'sara gacem', 'lina harbi',
  'yasmine merabet', 'nadia belkacem', 'selma kaci', 'rania lounis',
  'mouna derbal', 'houda benaissa', 'amina ould ali', 'layla rezig',
  'sabrina benslama', 'fatma zerhouni', 'lamia salah'
];

// Determine image by checking name
const getDoctorImage = (name) => {
  const cleanedName = name.replace('Dr. ', '').toLowerCase();
  const isFemale = femaleNames.some(fname => cleanedName.includes(fname));
  return isFemale ? femaleDoctorImage : maleDoctorImage;
};

const Booking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('9:00 am');
  const [doctor, setDoctor] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [days, setDays] = useState([]);

  const times = [
    '8:00 am', '8:30 am', '9:00 am', '9:30 am',
    '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  ];

  const doctorsData = [
    { id: 31, name: 'Dr. Nassim Benkhaled', specialty: 'Cardiologie', location: 'Algiers', about: 'Expert in diagnosing and treating heart conditions, ensuring cardiovascular health with advanced care.' },
    { id: 32, name: 'Dr. Imane Zerrouki', specialty: 'Dermatologie', location: 'Algiers', about: 'Focused on skin health and modern treatments for dermatological conditions.' },
    { id: 33, name: 'Dr. Khaled Bouchareb', specialty: 'Neurologie', location: 'Algiers', about: 'Specialist in brain and nervous system disorders, providing thorough and compassionate neurological care.' },
    { id: 34, name: 'Dr. Meriem Chaouch', specialty: 'Pédiatrie', location: 'Algiers', about: 'Dedicated to children’s health, offering gentle and effective pediatric medical services.' },
    { id: 35, name: 'Dr. Riad Saadi', specialty: 'Médecine Générale', location: 'Algiers', about: 'Provides holistic and preventive primary care for patients of all ages.' },
    { id: 36, name: 'Dr. Sara Gacem', specialty: 'Gynécologie-Obstétrique', location: 'Algiers', about: 'Committed to women’s health, offering support through all stages of life and pregnancy.' },
    { id: 37, name: 'Dr. Lina Harbi', specialty: 'Radiologie', location: 'Algiers', about: 'Skilled in imaging and diagnostics, aiding accurate and early disease detection.' },
    { id: 38, name: 'Dr. Amine Bouabdellah', specialty: 'Radiologie', location: 'Algiers', about: 'Delivers precise diagnostic imaging to support effective treatment planning.' },
    { id: 39, name: 'Dr. Yasmine Merabet', specialty: 'Orthopédie', location: 'Algiers', about: 'Expert in treating bone, joint, and muscle disorders with advanced orthopedic solutions.' },
    { id: 40, name: 'Dr. Tarek Sebaa', specialty: 'ORL', location: 'Algiers', about: 'Manages conditions related to the ear, nose, and throat with precision and care.' },
    { id: 41, name: 'Dr. Nadia Belkacem', specialty: 'Cardiologie', location: 'Algiers', about: 'Specialized in heart health, offering advanced care for a wide range of cardiovascular conditions.' },
    { id: 42, name: 'Dr. Selma Kaci', specialty: 'Médecine Générale', location: 'Algiers', about: 'A trusted general practitioner delivering comprehensive everyday health care.' },
    { id: 43, name: 'Dr. Zine Kherbache', specialty: 'Pédiatrie', location: 'Algiers', about: 'Provides compassionate and thorough care to ensure the well-being of children.' },
    { id: 44, name: 'Dr. Hakim Mansouri', specialty: 'Urologie', location: 'Algiers', about: 'Specialist in urinary tract and male reproductive system health.' },
    { id: 45, name: 'Dr. Rania Lounis', specialty: 'Neurologie', location: 'Algiers', about: 'Offers expert care for neurological conditions using the latest techniques in neuroscience.' },
    { id: 46, name: 'Dr. Kamel Zerguine', specialty: 'Ophtalmologie', location: 'Algiers', about: 'Focused on vision health and treating various eye conditions with modern solutions.' },
    { id: 47, name: 'Dr. Mouna Derbal', specialty: 'Gynécologie-Obstétrique', location: 'Algiers', about: 'Dedicated to providing comprehensive care in women’s reproductive health and obstetrics.' },
    { id: 48, name: 'Dr. Walid Kaci', specialty: 'Dermatologie', location: 'Algiers', about: 'Expert in diagnosing and treating a wide range of skin conditions.' },
    { id: 49, name: 'Dr. Houda Benaissa', specialty: 'Dermatologie', location: 'Algiers', about: 'Provides personalized care for skin, hair, and nail disorders.' },
    { id: 50, name: 'Dr. Nabil Benziane', specialty: 'Psychiatrie', location: 'Algiers', about: 'Committed to mental wellness, offering support for emotional and psychological challenges.' },
    { id: 51, name: 'Dr. Amina Ould Ali', specialty: 'ORL', location: 'Algiers', about: 'Expert in ear, nose, and throat treatments with a patient-centered approach.' },
    { id: 52, name: 'Dr. Farid Bouraoui', specialty: 'Chirurgie Générale', location: 'Algiers', about: 'Performs a wide range of surgical procedures with a focus on safety and precision.' },
    { id: 53, name: 'Dr. Layla Rezig', specialty: 'Orthopédie', location: 'Algiers', about: 'Treats injuries and conditions of the musculoskeletal system with advanced care.' },
    { id: 54, name: 'Dr. Reda Bendimerad', specialty: 'Radiologie', location: 'Algiers', about: 'Uses cutting-edge imaging to assist in accurate diagnoses and treatment planning.' },
    { id: 55, name: 'Dr. Sabrina Benslama', specialty: 'Pédiatrie', location: 'Algiers', about: 'Delivers attentive pediatric care tailored to each stage of a child’s development.' },
    { id: 56, name: 'Dr. Karim Gherbi', specialty: 'Médecine Générale', location: 'Algiers', about: 'A dependable family doctor offering preventive care and long-term health guidance.' },
    { id: 57, name: 'Dr. Fatma Zerhouni', specialty: 'Médecine Générale', location: 'Algiers', about: 'Provides reliable general health services with a focus on prevention and wellness.' },
    { id: 58, name: 'Dr. Yassine Aouchiche', specialty: 'Neurologie', location: 'Algiers', about: 'Treats complex neurological disorders using advanced diagnostic tools and care.' },
    { id: 59, name: 'Dr. Lamia Salah', specialty: 'Urologie', location: 'Algiers', about: 'Expert in treating urological conditions with personalized patient care.' },
    { id: 60, name: 'Dr. Mohamed Benali', specialty: 'Pédiatrie', location: 'Algiers', about: 'Focused on ensuring children’s growth and health through personalized pediatric services.' }
  ];

  useEffect(() => {
    const today = new Date();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const generatedDays = [];
    
    // Start with the next day (tomorrow) and show 5 days
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1); // +1 to start from tomorrow
      
      const dayOfWeek = dayNames[date.getDay()];
      const dayOfMonth = date.getDate();
      
      generatedDays.push({
        id: dayOfWeek,
        number: dayOfMonth.toString()
      });
    }
    
    setDays(generatedDays);
    setSelectedDay(generatedDays[0].id); // Select first day by default
  }, []);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor = doctorsData.find(doc => doc.id === parseInt(doctorId));
      if (foundDoctor) {
        setDoctor(foundDoctor);
      }
    }
  }, [doctorId]);

  const handleBookAppointment = () => {
    if (!doctor || !selectedDay) return;
    
    // Find selected day details
    const selectedDayObj = days.find(day => day.id === selectedDay);
    
    // Get current date information for formatting
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    
    // Format date with current month and year
    const date = `${selectedDayObj.number} ${currentMonth}, ${currentYear}`;
    
    // Create appointment object
    const newAppointment = {
      id: Date.now(), // Unique ID
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorImage: getDoctorImage(doctor.name),
      specialty: doctor.specialty,
      address: `Rue 3 Nouvelle Villa Constantine Algeria`,
      date: date,
      time: selectedTime,
      status: 'Upcoming'
    };
    
    // Retrieve existing appointments
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Add new appointment
    const updatedAppointments = [...existingAppointments, newAppointment];
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Show success message
    setSuccessMessage('Appointment booked successfully!');
    
    // Redirect to appointments page after a short delay
    setTimeout(() => {
      navigate('/appointments');
    }, 1500);
  };

  if (!doctor || days.length === 0) {
    return <div className="loading">Loading doctor information...</div>;
  }

  return (
    <>
      <Header/>
      <div className="booking-container">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <div className="doctor-profile">
          <div className="doctor-image-container">
            <img 
              src={getDoctorImage(doctor.name)} 
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

          <button className="book-button" onClick={handleBookAppointment}>Book an appointment</button>
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
