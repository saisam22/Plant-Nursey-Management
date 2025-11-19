const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());
app.use(methodOverride('_method'));

// API Routes
app.use('/api/plants', require('./routes/plantRoutes'));

// Web Routes
app.use('/', require('./routes/webRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (req.accepts('html')) {
        res.status(statusCode).render('error', {
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    } else {
        res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});