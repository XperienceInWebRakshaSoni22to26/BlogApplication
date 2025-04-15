const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { connect } = require('mongoose');
const path = require('path');
const connectdb = require('./config/dbconnection');




dotenv.config();


// router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');







// db connection
connectdb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);
// Serve Vite frontend
const __dirnamePath = path.resolve(); // to resolve __dirname in ES module style
const frontendPath = path.join(__dirnamePath, '../client/blogapp/dist');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});


const PORT = process.env.PORT || 8080;


// listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
});