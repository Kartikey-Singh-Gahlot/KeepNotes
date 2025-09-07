const userModel = require('../Models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const signUp = async (req, res)=>{
  const {name, email, password} = req.body; 
  try{
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = new userModel({name, email, password:hash });
    await user.save();
    const token = jwt.sign({email}, process.env.SECRETKEY);
    const cookieDetails = {
      httpOnly: true,
      maxAge : 7*24*60*60*1000
    }

    res.cookie("token", token, cookieDetails);
    res.status(200).json({
      status : true,
      body : "SignUp Successfull"
    })
  }
  catch(err){
    res.status(409).json({
      status:false,
      body :"Invalid Credentials"
    })
  }
}

const signIn = async (req, res)=>{
  const {email, password} = req.body;
  try{
   const user = await userModel.findOne({email});
   const valid = await bcrypt.compare(password, user.password);
   if(valid){
    const token = jwt.sign({email},process.env.SECRETKEY);
    const cookieDetails = {
      httpOnly: true,
      maxAge : 7*24*60*60*1000
    }
    res.cookie("token", token, cookieDetails);
    res.status(200).json({
      status:true,
      body:"Login Successfull"
    })
   }
   else{
    res.status(409).json({
      status:false,
      body:"Invalid Credentials"
    })
   }
  }
  catch(err){
     res.status(409).json({
      status:false,
      body :"Credentials, Doesn't Exists"   
    })
  }

} 

const signOut = (req, res)=>{
  try{
    res.clearCookie("token");
    res.status(200).json({
      status:true,
      body:"Log Out Successfull"
    })
  }
  catch(err){
    res.status(400).json({
      status:false,
      body:"Unable To Logout"
    }) 
  } 
}

const checkAuth = async (req, res)=>{
   const {token} = req.cookies;
      if(!(token)){ 
        res.status(200).json({
           status:false,
           body:"Not Authorized"
        })
      }
      else{
        try{
         const decoded = jwt.verify(token,process.env.SECRETKEY);
         res.status(200).json({
           status:true,
           body:"Already LoggedIn"
         })
        }
      catch(err){
        res.status(401).json({
        status:false,
        body:"Not Authorized"
      })
    } 
  }
}

module.exports  = {signUp, signIn, signOut , checkAuth};