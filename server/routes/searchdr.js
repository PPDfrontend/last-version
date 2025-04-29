const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateSession } = require('../middleware/auth');

// Get all cities/wilayas for dropdown
router.get('/cities', async (req, res) => {
  try {
    const sql = `SELECT CityID, City, State FROM city ORDER BY City`;
    const [cities] = await db.query(sql);
    
    res.json({
      success: true,
      cities
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load cities' 
    });
  }
});

// Get all specializations for dropdown
router.get('/specializations', async (req, res) => {
  try {
    const sql = `SELECT DISTINCT Specialization FROM doctor ORDER BY Specialization`;
    const [specializations] = await db.query(sql);
    
    res.json({
      success: true,
      specializations: specializations.map(s => s.Specialization)
    });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load specializations' 
    });
  }
});

// Search doctors by city and specialization
router.get('/doctors', authenticateSession, async (req, res) => {
  try {
    const { cityId, specialization, page = 1, limit = 10 } = req.query;
    
    // Validate parameters
    if (!cityId && !specialization) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide at least a city or specialization' 
      });
    }

    if (page < 1 || limit < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid pagination parameters' 
      });
    }

    const offset = (page - 1) * limit;
    
    // Base query parts
    const baseQuery = `
      FROM doctor d
      JOIN address a ON d.AddressID = a.AddressID
      JOIN city c ON a.CityID = c.CityID
      WHERE 1=1
    `;

    // Build WHERE conditions
    const conditions = [];
    const params = [];

    if (cityId) {
      conditions.push('c.CityID = ?');
      params.push(cityId);
    }

    if (specialization) {
      conditions.push('d.Specialization = ?');
      params.push(specialization);
    }

    // Count query
    const countSql = `SELECT COUNT(*) as total ${baseQuery} ${conditions.length ? 'AND ' + conditions.join(' AND ') : ''}`;
    const [countResult] = await db.query(countSql, params);
    const total = countResult.total;

    // Data query
    const dataSql = `
      SELECT 
        d.DoctorID,
        CONCAT(d.FirstName, ' ', d.LastName) as FullName,
        d.Email,
        d.PhoneNum,
        d.Specialization,
        c.City,
        c.State,
        a.Street
      ${baseQuery}
      ${conditions.length ? 'AND ' + conditions.join(' AND ') : ''}
      ORDER BY d.LastName, d.FirstName
      LIMIT ? OFFSET ?
    `;
    
    const [doctors] = await db.query(dataSql, [...params, parseInt(limit), offset]);

    res.json({
      success: true,
      doctors,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Doctor search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while searching for doctors',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get doctor details by ID
router.get('/doctors/:id', authenticateSession, async (req, res) => {
  try {
    const doctorId = req.params.id;
    
    if (!doctorId || isNaN(doctorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    // Get doctor details
    const sql = `
      SELECT 
        d.DoctorID,
        d.FirstName,
        d.LastName,
        d.Email,
        d.PhoneNum,
        d.Specialization,
        d.LicenseNumber,
        c.City,
        c.State,
        a.Street
      FROM doctor d
      JOIN address a ON d.AddressID = a.AddressID
      JOIN city c ON a.CityID = c.CityID
      WHERE d.DoctorID = ?
    `;
    
    const [doctor] = await db.query(sql, [doctorId]);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }
    
    // Get doctor's availability
    const availabilitySql = `
      SELECT 
        AvailabilityID,
        DayOfWeek,
        StartTime,
        EndTime,
        SlotDuration
      FROM availability
      WHERE DoctorID = ?
      ORDER BY 
        CASE DayOfWeek
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          WHEN 'Saturday' THEN 6
          WHEN 'Sunday' THEN 7
        END, 
        StartTime
    `;
    
    const [availability] = await db.query(availabilitySql, [doctorId]);
    
    res.json({
      success: true,
      doctor: {
        ...doctor,
        FullName: `${doctor.FirstName} ${doctor.LastName}`
      },
      availability
    });
    
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load doctor details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;