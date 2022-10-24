import mongoose from 'mongoose';

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

export default mongoose.model('Tag', tagSchema);