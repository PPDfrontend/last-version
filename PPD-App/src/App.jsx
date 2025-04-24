import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Header from './Component/Header';
import Home from './Pages/Home'; 
import All from './Pages/All';
import Booking from './Pages/Booking';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return(
    <BrowserRouter basename="/PPD-Login-SignUp">

      <Header/>
      
       <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/all" element={<All />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking/:doctorId" element={<Booking />} />
        <Route path="/home" element={<Home />} /> 
      </Routes> 
    </BrowserRouter>
  );
}

export default App; 