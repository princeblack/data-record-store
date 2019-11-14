const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrdersSchema = new Schema({
    date:{
        type: Date,
        require : true,
    },
    quantity:{
        type : Number,
        require: true
    },
    records:{
        record_id:{
            type: Number,
            unique: true,
            require:true
        }
    }
});


module.exports = mongoose.model('Orders',OrdersSchema)

