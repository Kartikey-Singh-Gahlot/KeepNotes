const Joi = require('joi');
const jwt = require('jsonwebtoken');

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});



const signStatusChecker = (req, res, next)=>{
   const {token} = req.cookies;
   if(!(token)){ next();}
   
   else{
     try{
      jwt.verify(token, process.env.SECRETKEY);
      res.status(403).json({
        status:false,
        body:"Already LoggedIn"
      })
     }
     catch(err){
        res.status(401).json({
          status:false,
          body:"not authorized"
        })
     } 
   }
}


const signupDataChecker = (req, res, next) =>{
   const {name, email, password} = req.body;
   const { error, value } = schema.validate({name,email,password});
    if(error){
       const message = error.details[0].message.replace(/\"/g, '');
       res.status(409).json({
        status:false,
        body : message
       })
    }
    else{
      next();
    }
}

const signinDataChecker = (req, res, next) =>{
   const {email, password} = req.body;
   const { error, value } = schema.validate({email, password});
   console.log("active");
    if(error){
       const message = error.details[0].message.replace(/\"/g, '');
       res.status(409).json({
        status:false,
        body : message
       })
    }
    else{
      next();
    }
}





module.exports = {signupDataChecker, signinDataChecker, signStatusChecker}