const mongoose = require('mongoose');

const coachTeamSchema = new mongoose.Schema({
  teamName:{
    type:String,
    required:true
  },
  coachId:{
    type:String,
    required:true,
    unique:true
  },
  team:[{
    id:{type:String,required:true},
    fullName:{type:String,required:true},
    address:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true}
  }]
},{collection:'teams'}
);

module.exports = mongoose.model('coachTeamSchema',coachTeamSchema );
