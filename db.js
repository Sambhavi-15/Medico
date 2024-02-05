const mongoose = require('mongoose');
const uri = 'mongodb+srv://sambhavik0502:Sambhavi1502@cluster0.c6jhjiv.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongo connected');
       

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit with an error code
    }
};

module.exports = connectDB;











































