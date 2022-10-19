const mongoose = require('mongoose');
const Question = require('./questionSchema')

const answerSchema = new mongoose.Schema({
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

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }

},
    { timestamps: true }
)

module.exports = mongoose.model('Answer', answerSchema)