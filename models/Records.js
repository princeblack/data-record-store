const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecordsSchema = new Schema({
    title:{
        type : String,
        require : true
    },
    artist:{
        type: String,
        require : true
    },
    price:{
        type: Number,
        require : true
    },
    year:{
        type: Date,
        require : true
    }
  });

  module.exports = mongoose.model('Records',RecordsSchema);