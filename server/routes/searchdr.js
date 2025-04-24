const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateSession } = require('../middleware/auth'); // Use your friend's auth middleware

// Get all cities/wilayas for dropdown
router.get('/cities', async (req, res) => {
  try {
    const sql = `SELECT CityID, City, State FROM city ORDER BY City`;
    const cities = await db.query(sql);
    
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
    const specializations = await db.query(sql);
    
    res.json({
      success: true,
      specializations
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
    
    // Validate required parameters
    if (!cityId && !specialization) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select at least a city or specialization' 
      });
    }
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Build the SQL queries
    let countSql = `
      SELECT COUNT(*) as total
      FROM doctor d
      JOIN address a ON d.AddressID = a.AddressID
      JOIN city c ON a.CityID = c.CityID
      WHERE 1=1
    `;
    
    let sql = `
      SELECT 
        d.DoctorID,
        d.FirstName,
        d.LastName,
        d.Email,
        d.PhoneNum,
        d.Specialization,
        c.City,
        c.State,
        a.Street
      FROM doctor d
      JOIN address a ON d.AddressID = a.AddressID
      JOIN city c ON a.CityID = c.CityID
      WHERE 1=1
    `;
    
    const params = [];
    const countParams = [];
    
    // Add filters based on provided parameters
    if (cityId) {
      const condition = ` AND c.CityID = ?`;
      sql += condition;
      countSql += condition;
      params.push(cityId);
      countParams.push(cityId);
    }
    
    if (specialization) {
      const condition = ` AND d.Specialization = ?`;
      sql += condition;
      countSql += condition;
      params.push(specialization);
      countParams.push(specialization);
    }
    
    // Add sorting
    sql += ` ORDER BY d.LastName, d.FirstName`;
    
    // Add pagination
    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);
    
    // Execute queries
    const [countResult] = await db.query(countSql, countParams);
    const doctors = await db.query(sql, params);
    
    res.json({
      success: true,
      doctors,
      pagination: {
        total: countResult.total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult.total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Doctor search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while searching for doctors' 
    });
  }
});

// Get doctor details by ID
router.get('/doctors/:id', authenticateSession, async (req, res) => {
  try {
    const doctorId = req.params.id;
    
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
    
    // Get doctor's availability if present
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
        CASE 
          WHEN DayOfWeek = 'Monday' THEN 1
          WHEN DayOfWeek = 'Tuesday' THEN 2
          WHEN DayOfWeek = 'Wednesday' THEN 3
          WHEN DayOfWeek = 'Thursday' THEN 4
          WHEN DayOfWeek = 'Friday' THEN 5
          WHEN DayOfWeek = 'Saturday' THEN 6
          WHEN DayOfWeek = 'Sunday' THEN 7
        END, 
        StartTime
    `;
    
    const availability = await db.query(availabilitySql, [doctorId]);
    
    res.json({
      success: true,
      doctor,
      availability
    });
    
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load doctor details' 
    });
  }
});

export default router;


