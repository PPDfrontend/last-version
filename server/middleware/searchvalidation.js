function validateSearchParams(req, res, next) {
    // Validate cityId if provided
    if (req.query.cityId) {
      const cityId = parseInt(req.query.cityId);
      if (isNaN(cityId) || cityId <= 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid city selected' 
        });
      }
      req.query.cityId = cityId;
    }
    
    // Validate specialization if provided
    if (req.query.specialization) {
      // Remove any SQL injection characters
      req.query.specialization = req.query.specialization.replace(/[;'"\\]/g, '');
      
      if (req.query.specialization.length < 2) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid specialization' 
        });
      }
    }
    
    next();
  }
  
  module.exports = { validateSearchParams };
  
