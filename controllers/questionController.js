
import questionModel from '../model/questionSchema.js';
import tagModel from '../model/tagSchema.js';
import answerModel from '../model/answerSchema.js';
import userModel from '../model/userSchema.js';
import { responseHandler } from '../utitlity/responseHandler.js'
import { ERROR_MESSAGE, ACCESS_DENIED, INVALID_USER } from '../constants/constants.js';

export const getAllquestions = async (request, response) => {
    try {
        const questionList = await questionModel.find({});
        responseHandler(request, response, questionList, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}


export const getQuestionFromId = async (request, response) => {
    try {
        const questionId = request.params.questionId;
        const question = await questionModel.findById(questionId);
        responseHandler(request, response, question, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}

export const postQuestion = async (request, response) => {
    try {
        const decode = request.jwt;
        if (!decode) {
            responseHandler(request, response, null, null, INVALID_USER, ACCESS_DENIED, 403);
        }

        const { title, username, description, tag, answer } = request.body;
        for (let i = 0; i < tag.length; i++) {
            const newTag = tagModel(tag[i]);
            let findTag = await tagModel.findOne({ name: newTag.name })
            if (!findTag) {
                await newTag.save();
            }
        }

        let newTagIdArr = [];

        for (let i = 0; i < tag.length; i++) {
            const newTag = tagModel(tag[i]);
            const findtag = await tagModel.find({ name: newTag.name });
            let tagId = findtag[0]._id;
            newTagIdArr.push(tagId)

        }

        const questionToBeAdded = new questionModel({ title, username, description, tag: newTagIdArr, answer });
        await questionToBeAdded.save();

        const user = await userModel.updateOne({ username: username }, { $addToSet: { questions: questionToBeAdded } });
        for (let i = 0; i < newTagIdArr.length; i++) {
            const tag = await tagModel.findById(newTagIdArr[i]);
            tag.question.push(questionToBeAdded._id);
            await tag.save();

        }
        responseHandler(request, response, request.body, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }

}

export const getAnswers = async (request, response) => {
    try {
        const questionId = request.params.questionId;
        const answerList = await answerModel.find({ questionId: questionId });
        responseHandler(request, response, answerList, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }

}

export const getAllQuestionFromTag = async (request, response) => {
    try {
        const decode = request.jwt;
        if (!decode) {
            responseHandler(request, response, null, null, INVALID_USER,ACCESS_DENIED,403);
        }
        const tagName = request.params.tagname;
        const tag = await tagModel.findOne({ name: tagName });
        const questionArray = [];
        tag.question.forEach(async (questionId) => {
            const question = await questionModel.findById(questionId);
            questionArray.push(question);
            if (questionArray.length === tag.question.length) {
                response.send(questionArray);
                responseHandler(request, response, questionArray, 200, null, null, null);
            }
        })
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }

}
