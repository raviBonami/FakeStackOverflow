const mongoose = require('mongoose');

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
        type: Number
    }

},
    { timestamps: true }
)

module.exports = {
    answerSchema
}