import mongoose from 'mongoose';

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

export default mongoose.model('Answer', answerSchema);