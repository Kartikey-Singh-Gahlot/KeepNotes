const mongoose = require('mongoose');
require('dotenv').config();

async function setDbConnection() {
   try{
     await mongoose.connect(process.env.MONGOURL); 
   }
   catch(err){
     throw err;
   }
}

module.exports = setDbConnection;