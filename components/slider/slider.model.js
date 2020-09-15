const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
    images: [String],
 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

},{
    timestamps: true
})

module.exports = mongoose.model('slider',SliderSchema);