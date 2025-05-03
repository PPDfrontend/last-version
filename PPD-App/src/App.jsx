import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import All from './Pages/All';
import All2 from './Pages/All2';
import Booking from './Pages/Booking';
import About from './Pages/About';
import About2 from './Pages/About2';
import Contact from './Pages/Contact';
import Contact2 from './Pages/Contact2';
import MyAcc from './Pages/MyAcc';
import Appointments from './Pages/Appointments';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/All" element={<All />} />
        <Route path="/All2" element={<All2 />} />
        <Route path="/About" element={<About />} />
        <Route path="/About2" element={<About2 />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Contact2" element={<Contact2 />} />
        <Route path="/MyAcc" element={<MyAcc />} />
        <Route path="/Appointments" element={<Appointments />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Booking/:doctorId" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;