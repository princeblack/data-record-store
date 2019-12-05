const mongoose = require('mongoose');
const {Schema} = mongoose;
const AddressSchema = new Schema({
    street:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    }
})

module.exports = AddressSchema;