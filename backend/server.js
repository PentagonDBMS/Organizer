const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');;
const authRoutes = require('./routes/authRoutes.js'); // Import the admin routes
const eventRoutes = require('./routes/eventRoutes.js'); // Import the manager routes
const studentRoutes = require('./routes/studentRoutes.js'); // Import the manager routes
const accommodationRoutes = require('./routes/accommodationRoutes.js'); // Import the manager routes
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(cookieParser());

app.use('/api/org/auth', authRoutes); // Mount the admin routes with prefix /api/admin
app.use('/api/org/events', eventRoutes); // Mount the manager routes with prefix /api/organizers
app.use('/api/org/students', studentRoutes); // Mount the manager routes with prefix /api/organizers
app.use('/api/org/accommodations', accommodationRoutes); // Mount the manager routes with prefix /api/organizers


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
