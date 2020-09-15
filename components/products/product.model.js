const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    point: Number,
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})

const ProductSchema = new Schema({
    name: String,
    category: {
        type: String,
        required: true
    },
    featuredProduct: Boolean,
    description: String,
    price: Number,
    color: String,
    size: String,
    modelNo: String,
    manuDate: Date,
    expiryDate: Date,
    brand: String,
    quantity: Number,
    weight: Number,
    inCart: Boolean,
    images: [String],
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String,
            enum: ['percentage','quantity','value']
        },
        discountValue: String
    },
    status:{
        type: String,
        enum: ['out of stock','available','booked','sold'],
        default: 'available'
    },
    ratings: [ratingSchema],
    tags: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('product',ProductSchema);