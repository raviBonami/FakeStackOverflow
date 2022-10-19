const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,

    },

    description: {
        type: String,
    },

    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],

    answer:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }]


},
    { timestamps: true }
)

module.exports = mongoose.model('Question', questionSchema)