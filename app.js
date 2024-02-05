// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB=require("./db")
//const { default: createDoc } = require('./models/Schma')
mongoDB();

app.use(express.json());

app.use(cors());


  
app.use('/api/signup',require("./Routes/SignUp") )
app.use('/api/login',require("./Routes/Loginchk") )
app.use('/api/user',require("./Routes/UserInfo") )
app.use('/api/doctors',require("./Routes/DoctorList") )


// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
//mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
