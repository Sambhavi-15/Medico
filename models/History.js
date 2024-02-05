const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  medicoid: {
    type: String,
    required: true
  },
  history: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      
      pname: {
        type: String
      },
      dname: {
        type: String
      },
      age: {
        type: String
      },
      speciality: {
        type: String
      },
      contact: {
        type: String
      }
      // Add more fields as needed for each item in the history array
    }
  ]
});

const History = mongoose.model('History', historySchema);

module.exports = History;
