import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
//this is a comment to test git commit
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-login"
});
//this is a comment to test 
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

// Fix the endpoint to match what frontend is expecting
app.post('/signup', async (req, res) => {
    try {
        // Validate that password and confirmed password match
        if (req.body.password !== req.body.cpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmed password do not match"
            });
        }
        
        // Check if email already exists
        const emailExists = await checkEmailExists(req.body.email);
        if (emailExists) {
            return res.status(409).json({
                success: false, 
                message: "Email already registered. Please use a different email or login."
            });
        }
        
        // Generate salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        
        // Also hash the confirmed password if you're storing it
        // Note: It's better practice not to store the confirmed password in the database
        const hashedCPassword = hashedPassword; // Use same hash since they match
        
        const sql = "INSERT INTO user_info (`first_name`, `last_name`, `email`, `password`, `cpassword`, `phone`, `dob`, `gender`) VALUES (?)";
        //mdlsqkjfqdsmf
        const formData = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword,     // Store hashed password
            hashedCPassword,    // Store hashed confirm password
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

app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM user_info WHERE email = ?";
    
    db.query(sql, [req.body.email], async (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({login: false, message: "Error inside server"});
        }
        
        if (result.length > 0) {
            try {
                // Compare the provided password with the stored hash
                const match = await bcrypt.compare(req.body.password, result[0].password);
                
                if (match) {
                    // Password is correct
                    req.session.email = result[0].email; // Store user info in session
                    console.log(req.session.email);
                    return res.json({login: true});
                } else {
                    // Password is incorrect
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

app.listen(8081, () => {
    console.log('Server running on port 8081!');
});