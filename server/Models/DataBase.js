const mongoose = require('mongoose');
require('dotenv').config();

async function setDbConnection() {
   await mongoose.connect(process.env.MONGOURL); 
}

module.exports = setDbConnection;