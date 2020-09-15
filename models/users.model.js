const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //db modelling
    name: String,
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    phoneNumber: {
        type: Number
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    image: String,
    gender: {
        type: String,
        enum: ['male','female','others']
    },
    address: {
        permanent_addr: String,
        temporary_addr: [String]
    },
    role: {
        type: Number,  //1,2,3   1=>admin  , 2=> end user  , 3=>accountant
        enum: [1,2,3],
        default: 2
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    passwordResetExpiry: Date
},{
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);