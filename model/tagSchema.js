const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    question:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
})

module.exports = mongoose.model('Tag', tagSchema)