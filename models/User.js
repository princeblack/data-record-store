const mongoose = require('mongoose');
const {Schema} = mongoose;
const Address = require('./Address');

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        required: true
    },
    birthday:{
        type: String
    },
    userName:{
        type: String,
        required: true,
    },
    Address:{
        type: Address,
        required: true
    }
  },
  {  toObject:{
        virtuals: true
    },
    toJSON:{
        virtuals: true
    }}
);

  UserSchema.virtual('fullName').get(function(){
      return this.firstName + ' ' + this.lastName;
  })

  module.exports = mongoose.model('User',UserSchema);