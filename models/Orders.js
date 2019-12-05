const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    date: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true
    },
    records: [
        {
            quantity: {
                type: Number,
                required: true
            },
            record: {
                type: Schema.Types.ObjectId,
                ref: 'Record'
            }
        }
    ]
},
{
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

OrderSchema.virtual('totalPrice').get(function() {
    let records = this.records;
  
    totalPriceReducer = (acc, curr) => {
      return acc + curr.quantity * curr.record.price;
    };
  
    return records.reduce(totalPriceReducer, 0);
  });

module.exports = mongoose.model('Orders', OrdersSchema)

