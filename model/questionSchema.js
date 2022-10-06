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

    tags: {
        type: Array,

    },

    answers: {
        type: Array
    }

},
    { timestamps: true }
)

module.exports = {
    questionSchema
}