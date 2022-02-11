const mongoose = require('mongoose');

const matchDetailsSchema = new mongoose.Schema({

  schedules:[{
    teama:{
      type:String,
      required:true
          },
    teamb:{
      type:String,
      required:true
          },
    date:{
      type:Date,
      required:true
          },
    time:{
      type:String,
      required:true
        },
    venue:{
      type:String,
      required:true
    },
    referee:{
      type:String,
      required:true
    }
            }]
},{collection:'matches'}
);

module.exports = mongoose.model('matchDetailsSchema',matchDetailsSchema );
