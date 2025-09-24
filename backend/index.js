const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const setDbConnection = require('./Models/DataBase.js');
const Routes = require('./Routes/Routes.js');



const app = express();

app.use(cors( {origin: true,
   methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
   credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

setDbConnection().then(()=>{
   console.log("database connected")
}).catch((err)=>{ 
   process.exit(1);
});


app.use("/", Routes)


module.exports = app;