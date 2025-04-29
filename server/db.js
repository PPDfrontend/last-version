import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-login" // Your main database
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Check if email exists in the database
const checkEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM user_info WHERE email = ?";
        db.query(query, [email], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result.length > 0);
        });
    });
};

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        if (req.body.password !== req.body.cpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmed password do not match"
            });
        }
        
        const emailExists = await checkEmailExists(req.body.email);
        if (emailExists) {
            return res.status(409).json({
                success: false, 
                message: "Email already registered. Please use a different email or login."
            });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const hashedCPassword = hashedPassword;
        
        const sql = "INSERT INTO user_info (`first_name`, `last_name`, `email`, `password`, `cpassword`, `phone`, `dob`, `gender`) VALUES (?)";
        const formData = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword,
            hashedCPassword,
            req.body.phone,
            req.body.dob,
            req.body.gender,
        ];
        
        db.query(sql, [formData], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({success: false, message: "Error in database operation"});
            }
            return res.json({success: true, message: "User registered successfully"});
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({success: false, message: "Server error during registration"});
    }
});

// Login endpoint
app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM user_info WHERE email = ?";
    
    db.query(sql, [req.body.email], async (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({login: false, message: "Error inside server"});
        }
        
        if (result.length > 0) {
            try {
                const match = await bcrypt.compare(req.body.password, result[0].password);
                
                if (match) {
                    req.session.email = result[0].email;
                    console.log(req.session.email);
                    return res.json({login: true});
                } else {
                    return res.json({login: false, message: "Invalid email or password"});
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                return res.status(500).json({login: false, message: "Server error during login"});
            }
        } else {
            return res.json({login: false, message: "Invalid email or password"});
        }
    });    
});

// Doctors endpoints
app.get('/api/doctors', (req, res) => {
    const sql = "SELECT DoctorID as id, FirstName, LastName, Specialization as specialty, Email, PhoneNum as phone, LicenseNumber as license FROM doctor";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Error fetching doctors',
                details: err.message
            });
        }
        
        // Format the results to match your frontend expectations
        const formattedDoctors = result.map(doctor => ({
            id: doctor.id,
            name: `Dr. ${doctor.FirstName} ${doctor.LastName}`,
            specialty: doctor.specialty,
            email: doctor.Email,
            phone: doctor.phone,
            license: doctor.license,
            // Add default location and gender if needed
            location: 'Algiers', // Default or fetch from AddressID
            gender: 'male' // Default or add to your schema
        }));
        
        return res.json(formattedDoctors);
    });
});
app.get('/api/doctors/search', (req, res) => {
    const { specialist, location } = req.query;
    let sql = "SELECT id, name, specialty, location, gender FROM doctor WHERE 1=1"; // Changed to singular 'doctor'
    const params = [];
    
    if (specialist) {
        sql += " AND specialty LIKE ?";
        params.push(`%${specialist}%`);
    }
    
    if (location) {
        sql += " AND location LIKE ?";
        params.push(`%${location}%`);
    }
    
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Error searching doctors' });
        }
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log('Server running on port 8081!');
});