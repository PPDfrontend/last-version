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

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Fix the endpoint to match what frontend is expecting
app.post('/signup', (req, res) => {

    const sql = "INSERT INTO user_info (`first_name`, `last_name`, `email`, `password`, `cpassword`, `phone`, `dob`, `gender`) VALUES (?)";
    
    const formData = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password,
        req.body.cpassword,
        req.body.phone,
        req.body.dob,
        req.body.gender,
    ];
    
    db.query(sql, [formData], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({message: "Error in database operation"});
        }
        return res.json({success: true, message: "User registered successfully"});
    });
});

app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM user_info WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({message: "error inside server"});
        if(result.length > 0){
            req.session.email = result[0].email // Store user info in session
            console.log(req.session.email);
            return res.json({login: true});
        }else{
            return res.json({login: false})
        }
    });    
});

app.listen(8081, () => {
    console.log('Server running on port 8081!');
});


