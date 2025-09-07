const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    notesTitle : {type:String, default: 'untitled'},
    notesContent : {type:String, default: 'empty' },
    createdAt : {type:Date, default : Date.now },
})

module.exports = new mongoose.model("notes", notesSchema);