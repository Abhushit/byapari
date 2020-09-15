const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const NotificationSchema = new Schema({

    message: String,
    link: String,
    seen: Boolean,
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
}) 

const NotificationModel = mongoose.model('notification', NotificationSchema);

module.exports = NotificationModel;