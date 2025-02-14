const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api', itemRoutes);

const PORT = process.env.PORT || 5001; // Change the port number here
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));