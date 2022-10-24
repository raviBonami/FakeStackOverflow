import mongoose from 'mongoose';

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

export default mongoose.model('Question', questionSchema);
