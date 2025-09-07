const userModel = require('../Models/UserModel.js');
const notesModel = require('../Models/NotesModel.js');
const jwt = require('jsonwebtoken');
const { mongoose, mongo } = require('mongoose');
require('dotenv').config();

const showNotes = async (req, res)=>{
  const {token}  = req.cookies;
  const {email, password } = req.query;
  
  if(token){
    try{
      let user = jwt.verify(token, process.env.SECRETKEY);
      if(user){
        const iv = user.email;
        const profile = await userModel.findOne({email:iv});
        const note = await notesModel.find({_id:{$in: profile.notes}});
        res.status(200).json({
          status : true,
          body : note,
          userId : profile.email,
          userName : profile.name
        })
      }
    }
    catch(err){
      res.status(400).json({
        status : false,
        body : [],
      })
    }
  }
  else{
    res.status(401).json({
      status:false,
      body :"not authorized"
    })
  }

}

const findNote = async (req, res)=>{
   let {id} = req.params;
   try{
     let data = await notesModel.findOne({_id:new mongoose.Types.ObjectId(id)});
     res.status(200).json({
      status:true,
      body : data 
     })
   }
   catch(err){
     res.status(400).json({
      status:false,
      body:"Invalid Data",
      details :err
     })
   }
}

const editNote = async (req, res)=>{
   let {notesTitle, notesContent} = req.body;
   let {id} = req.params;
   try{
     let data = await notesModel.updateOne({_id: new mongoose.Types.ObjectId(id)}, {$set:{notesTitle,notesContent}});
     res.status(201).json({
      status:true,
      body:"Updated New Value",
      details:data
     })
   }
   catch(err){
     res.status(400).json({
      status:false,
      body:"Can't Updated",
      details:err
     })
   }
}

const addNote = async (req, res)=>{
  let {token} = req.cookies;
  let {email} = jwt.verify(token, process.env.SECRETKEY);
  let {notesTitle, notesContent} = req.body;
  if (!notesTitle || notesTitle.trim() === "") {
     notesTitle = undefined;
   }
   if (!notesContent || notesContent.trim() === "") {
     notesContent = undefined;
   }
  try{
    let newNote = new notesModel({notesTitle, notesContent});
    newNote.save();
    await userModel.updateOne({email},{$push:{notes:new mongoose.Types.ObjectId(newNote._id)}})
    res.status(200).json({
      status:true,
      body: "Note Created"
    })
  } 
  catch(err){
    res.status(400).json({
      status:false,
      body: "Can't Create Note"
    })
  }
}

const deleteNote = async (req, res)=>{
  let {token} = req.cookies;
  let {email} = jwt.verify(token, process.env.SECRETKEY);
  let {id} = req.params;
  try{
     await notesModel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
     await userModel.updateOne({email}, {$pull:{notes: new mongoose.Types.ObjectId(id)}});  
     res.status(200).json({
      status:true,
      body : "Deleted Note"
     })
  }
  catch(err){
    res.status(400).json({
      status:false,
      body:"Failed to Delete"
    })
  }
}

module.exports = {showNotes, addNote, deleteNote, findNote, editNote};