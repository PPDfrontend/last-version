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

const Booking2 = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('9:00 am');
  const [doctor, setDoctor] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [days, setDays] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  const times = [
    '8:00 am', '8:30 am', '9:00 am', '9:30 am',
    '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  ];

  const doctorsData = [
    { id: 31, name: 'Dr. Nassim Benkhaled', specialty: 'Cardiology', available: true, gender: 'male', location: 'Constantine', address: 'Avenue Aouati Mostefa', about: 'Specialist in cardiology, expert in diagnosing and treating cardiovascular diseases.' },
    { id: 32, name: 'Dr. Imane Zerrouki', specialty: 'Dermatology', available: true, gender: 'female', location: 'Constantine', address: 'Rue Abane Ramdane', about: 'Experienced dermatologist, specialized in treating skin conditions and dermatological disorders.' },
    { id: 33, name: 'Dr. Khaled Bouchareb', specialty: 'Neurology', available: true, gender: 'male', location: 'Constantine', address: 'Boulevard Zaamouche Ali', about: 'Qualified neurologist, specialized in treating disorders of the nervous system.' },
    { id: 34, name: 'Dr. Meriem Chaouch', specialty: 'Pediatrics', available: true, gender: 'female', location: 'Constantine', address: 'Avenue Benmansour', about: 'Caring pediatrician, expert in medical care for infants, children, and adolescents.' },
    { id: 35, name: 'Dr. Riad Saadi', specialty: 'General Medicine', available: true, gender: 'male', location: 'Constantine', address: 'Avenue Aouati Mostefa', about: 'Skilled general practitioner providing primary healthcare for all ages.' },
    { id: 36, name: 'Dr. Sara Gacem', specialty: 'Gynecology-Obstetrics', available: true, gender: 'female', location: 'Constantine', address: 'Rue Abane Ramdane', about: 'Specialist in gynecology and obstetrics, supporting women throughout their reproductive life.' },
    { id: 37, name: 'Dr. Lina Harbi', specialty: 'Radiology', available: true, gender: 'female', location: 'Algiers', address: 'Boulevard Krim Belkacem', about: 'Experienced radiologist, specialized in medical imaging for accurate diagnosis.' },
    { id: 38, name: 'Dr. Amine Bouabdellah', specialty: 'Radiology', available: true, gender: 'male', location: 'Algiers', address: 'Rue Didouche Mourad', about: 'Qualified radiologist, expert in diagnostic and interventional imaging techniques.' },
    { id: 39, name: 'Dr. Yasmine Merabet', specialty: 'Orthopedics', available: true, gender: 'female', location: 'Algiers', address: 'Boulevard Krim Belkacem', about: 'Orthopedic specialist in musculoskeletal disorders and related surgical interventions.' },
    { id: 40, name: 'Dr. Tarek Sebaa', specialty: 'ENT', available: true, gender: 'male', location: 'Oran', address: 'Boulevard Millénium', about: 'ENT specialist treating disorders of the ear, nose, and throat.' },
    { id: 41, name: 'Dr. Nadia Belkacem', specialty: 'Cardiology', available: true, gender: 'female', location: 'Oran', address: 'Rue Larbi Ben M\'Hidi', about: 'Passionate cardiologist, expert in heart care and disease prevention.' },
    { id: 42, name: 'Dr. Selma Kaci', specialty: 'General Medicine', available: true, gender: 'female', location: 'Blida', address: 'Avenue Kritli Mokhtar', about: 'General practitioner providing comprehensive and continuous healthcare.' },
    { id: 43, name: 'Dr. Zine Kherbache', specialty: 'Pediatrics', available: true, gender: 'male', location: 'Blida', address: 'Boulevard Mohamed Boudiaf', about: 'Dedicated pediatrician, specialized in children and adolescent health.' },
    { id: 44, name: 'Dr. Hakim Mansouri', specialty: 'Urology', available: true, gender: 'male', location: 'Batna', address: 'Avenue de l\'Independence', about: 'Skilled urologist, specialized in urinary and genital conditions.' },
    { id: 45, name: 'Dr. Rania Lounis', specialty: 'Neurology', available: true, gender: 'female', location: 'Batna', address: 'Boulevard du 1er Novembre', about: 'Neurologist dedicated to treating complex neurological disorders.' },
    { id: 46, name: 'Dr. Kamel Zerguine', specialty: 'Ophthalmology', available: true, gender: 'male', location: 'Annaba', address: 'Cours de la Révolution', about: 'Expert ophthalmologist, caring for eye health and vision.' },
    { id: 47, name: 'Dr. Mouna Derbal', specialty: 'Gynecology-Obstetrics', available: true, gender: 'female', location: 'Annaba', address: 'Avenue du 1er Novembre', about: 'Qualified gynecologist-obstetrician, supporting women at all stages of reproductive life.' },
    { id: 48, name: 'Dr. Walid Kaci', specialty: 'Dermatology', available: true, gender: 'male', location: 'Béjaïa', address: 'Boulevard Colonel Amirouche', about: 'Experienced dermatologist, specialist in skin diseases and aesthetic treatments.' },
    { id: 49, name: 'Dr. Houda Benaissa', specialty: 'Dermatology', available: true, gender: 'female', location: 'Béjaïa', address: 'Avenue de la Liberté', about: 'Qualified dermatologist, expert in skin care and dermatological prevention.' },
    { id: 50, name: 'Dr. Nabil Benziane', specialty: 'Psychiatry', available: true, gender: 'male', location: 'Djelfa', address: 'Boulevard Mohamed Boudiaf', about: 'Competent psychiatrist, specialized in diagnosing and treating mental disorders.' },
    { id: 51, name: 'Dr. Amina Ould Ali', specialty: 'ENT', available: true, gender: 'female', location: 'Tizi Ouzou', address: 'Boulevard Stiti', about: 'ENT specialist, treating head and neck disorders.' },
    { id: 52, name: 'Dr. Farid Bouraoui', specialty: 'General Surgery', available: true, gender: 'male', location: 'Tlemcen', address: 'Avenue Larbi Ben M\'Hidi', about: 'Experienced general surgeon performing various types of surgical procedures.' },
    { id: 53, name: 'Dr. Layla Rezig', specialty: 'Orthopedics', available: true, gender: 'female', location: 'Skikda', address: 'Avenue Didouche Mourad', about: 'Orthopedic specialist, treating bone, joint, and muscle conditions.' },
    { id: 54, name: 'Dr. Reda Bendimerad', specialty: 'Radiology', available: true, gender: 'male', location: 'Sidi Bel Abbès', address: 'Boulevard de la Macta', about: 'Experienced radiologist providing imaging services for accurate diagnosis.' },
    { id: 55, name: 'Dr. Sabrina Benslama', specialty: 'Pediatrics', available: true, gender: 'female', location: 'Jijel', address: 'Avenue de l\'ALN', about: 'Experienced pediatrician dedicated to the health and development of children.' },
    { id: 56, name: 'Dr. Karim Gherbi', specialty: 'General Medicine', available: true, gender: 'male', location: 'Médéa', address: 'Boulevard du 1er Novembre', about: 'General practitioner providing preventive and curative care for patients of all ages.' },
    { id: 57, name: 'Dr. Fatma Zerhouni', specialty: 'General Medicine', available: true, gender: 'female', location: 'Relizane', address: 'Boulevard Zabana', about: 'Experienced general practitioner offering comprehensive and personalized care.' },
    { id: 58, name: 'Dr. Yassine Aouchiche', specialty: 'Neurology', available: true, gender: 'male', location: 'Guelma', address: 'Boulevard Ben Badis', about: 'Passionate neurologist, expert in treating complex neurological conditions.' },
    { id: 59, name: 'Dr. Lamia Salah', specialty: 'Urology', available: true, gender: 'female', location: "M'Sila", address: 'Avenue Mohamed Boudiaf', about: 'Experienced urologist specialized in urinary and reproductive system care.' },
    { id: 60, name: 'Dr. Mohamed Benali', specialty: 'Pediatrics', available: true, gender: 'male', location: 'Mila', address: 'Avenue du 1er Novembre', about: 'Caring pediatrician offering comprehensive medical care for children.' }
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

  useEffect(() => {
    // Get existing appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Get current date information
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    
    // Find the selected day number
    const selectedDayObj = days.find(day => day.id === selectedDay);
    if (!selectedDayObj) return;
    
    // Filter appointments for current doctor and selected day
    const booked = storedAppointments
      .filter(app => {
        // Check if the appointment is for the current doctor
        if (app.doctorId !== parseInt(doctorId)) return false;
        
        // Check if the appointment date matches the selected day
        const appDateParts = app.date.split(' ');
        const appDay = appDateParts[0]; // Get the day number
        const appMonth = appDateParts[1]; // Get the month
        const appYear = appDateParts[2]; // Get the year
        
        return appDay === selectedDayObj.number && 
               appMonth === currentMonth && 
               appYear === currentYear.toString();
      })
      .map(app => app.time);
    
    setBookedTimes(booked);
  }, [doctorId, selectedDay, days]);

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
      doctorAddress: doctor.address,
      date: date,
      time: selectedTime,
      status: 'Upcoming'
    };
    
    // Retrieve existing appointments
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Remove the old appointment for this doctor if it exists
    const updatedAppointments = existingAppointments.filter(app => app.doctorId !== doctor.id);
    
    // Add new appointment
    updatedAppointments.push(newAppointment);
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Show success message
    setSuccessMessage('Appointment updated successfully!');
    
    // Redirect to appointments page after a short delay
    setTimeout(() => {
      navigate('/Appointments');
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
              <p className="about-text">{doctor.about}</p>
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
            {times.map((time) => {
              const isBooked = bookedTimes.includes(time);
              return (
                <div 
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                  onClick={() => !isBooked && setSelectedTime(time)}
                >
                  {time}
                  {isBooked && <span className="booked-badge">Booked</span>}
                </div>
              );
            })}
          </div>

          <button 
            className="book-button" 
            onClick={handleBookAppointment}
            disabled={bookedTimes.includes(selectedTime)}
          >
            Update an appointment
          </button>
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

export default Booking2;
