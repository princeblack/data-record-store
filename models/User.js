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
    },
    password:{
        type: String,
        require: true
    },
    birthday:{
        type: String
    },
    userName:{
        type: String,
        require: true,
    }
  });

  module.exports = mongoose.model('User',UserSchema);