const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrdersSchema = new Schema({
    date:{
        type: String,
        require : true,
    },
    quantity:{
        type : Number,
        require: true
    },
    records:[{
        type: Schema.Types.ObjectId,
        ref: 'Records'
    }]
});


module.exports = mongoose.model('Orders',OrdersSchema)

