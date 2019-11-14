const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    birthday:{
        type: Date
    },
    userName:{
        type: String,
        require: true,
        unique: true
    }
  });

  module.exports = mongoose.model('User',UserSchema);