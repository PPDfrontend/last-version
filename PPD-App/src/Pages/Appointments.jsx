import React, { useState, useEffect } from 'react';
import './Appointments.css';
import Header from "../Component/Header-home";
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve appointments from localStorage
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      
      // Mark existing appointments as fixed (not movable)
      const appointmentsWithFixedFlag = parsedAppointments.map(app => ({
        ...app,
        isFixed: true
      }));
      
      setAppointments(appointmentsWithFixedFlag);
    }
  }, []);

  useEffect(() => {
    // Save appointments back to localStorage whenever they change
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const handleUpdateAppointment = (id) => {
    // Navigate to booking page for the specific doctor to update appointment
    const appointment = appointments.find(app => app.id === id);
    if (appointment) {
      navigate(`/Booking/${appointment.doctorId}`);
    }
  };

  const handleCancelAppointment = (id) => {
    // Remove the appointment from the list
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);
    
    // Update localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  // Handle appointment movement (only for non-fixed appointments)
  const handleMoveAppointment = (id, direction) => {
    const currentIndex = appointments.findIndex(app => app.id === id);
    if (currentIndex === -1) return;

    const appointment = appointments[currentIndex];
    
    // Skip if this is a fixed appointment
    if (appointment.isFixed) return;
    
    // Calculate new index
    let newIndex;
    if (direction === 'up' && currentIndex > 0) {
      // Can only move up if the previous appointment is also movable
      const prevAppointment = appointments[currentIndex - 1];
      if (prevAppointment.isFixed) return;
      newIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < appointments.length - 1) {
      // Can only move down if the next appointment is also movable
      const nextAppointment = appointments[currentIndex + 1];
      if (nextAppointment.isFixed) return;
      newIndex = currentIndex + 1;
    } else {
      return; // Invalid move
    }
    
    // Create new array with reordered appointments
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(currentIndex, 1);
    updatedAppointments.splice(newIndex, 0, appointment);
    
    setAppointments(updatedAppointments);
  };

  // Function to add a new appointment (to be called from elsewhere)
  // This is just for illustration - you would hook this up to your actual appointment creation flow
  const addNewAppointment = (newAppointment) => {
    // Add the new appointment at the bottom with isFixed set to false
    setAppointments([...appointments, { ...newAppointment, isFixed: false }]);
  };

  return (
    <>
      <Header />
      <div className="appointments-container">
        <h1 className="appointments-title">My Appointments</h1>
        
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className={`appointment-card ${!appointment.isFixed ? 'movable-appointment' : ''}`}
              >
                <div className="doctor-image-container">
                  <img 
                    src={appointment.doctorImage} 
                    alt={appointment.doctorName}
                    className="doctor-image" 
                  />
                </div>
                <div className="appointment-details">
                  <h3>{appointment.doctorName}</h3>
                  <p className="doctor-specialty">{appointment.specialty}</p>
                  <p className="appointment-address">
                    <strong>Address:</strong>
                    <span>{appointment.address}</span>
                  </p>
                  <p className="appointment-date">
                    <strong>Date & Time:</strong>
                    <span>{appointment.date} | {appointment.time}</span>
                  </p>
                </div>
                <div className="appointment-actions">
                  <button 
                    onClick={() => handleUpdateAppointment(appointment.id)}
                    className="update-button"
                  >
                    Update appointment
                  </button>
                  <button 
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="cancel-button"
                  >
                    Cancel appointment
                  </button>
                  
                  {/* Only show move buttons for non-fixed appointments */}
                  {!appointment.isFixed && (
                    <div className="movement-controls">
                      <button 
                        onClick={() => handleMoveAppointment(appointment.id, 'up')}
                        className="move-button"
                        disabled={appointments.indexOf(appointment) === 0}
                      >
                        Move Up
                      </button>
                      <button 
                        onClick={() => handleMoveAppointment(appointment.id, 'down')}
                        className="move-button"
                        disabled={appointments.indexOf(appointment) === appointments.length - 1}
                      >
                        Move Down
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-appointments">
              <p>You don't have any appointments scheduled.</p>
            </div>
          )}
        </div>
        
        
      </div>
    </>
  );
};

export default Appointments;