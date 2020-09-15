const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    name:String,
    address: {
        address1: String,
        address2: [String]
    },
    country: String,
    state: String,
    zip: String,
    phoneNumber: Number
},{
    timestamps:true
})

const PaymentModel = mongoose.model('payment',PaymentSchema);

module.exports = PaymentModel;