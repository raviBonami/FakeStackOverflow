import questionModel from '../model/questionSchema.js';
import tagModel from '../model/tagSchema.js';
import { responseHandler } from '../utitlity/responseHandler.js';
import { ERROR_MESSAGE } from '../constants/constants.js';

export const getTag = async (request, response) => {
    try {
        const tagList = await tagModel.find({});
        responseHandler(request, response, tagList, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}

export const getAllQuestionOfTag = async (request, response) => {
    try {
        const tagname = request.params.tagname;
        let tagInDb = await tagModel.findOne({ name: tagname });
        let questionList = [];
        for (let i = 0; i < tagInDb.question.length; i++) {
            const question = await questionModel.findById(tagInDb.question[i]);
            question !== null && questionList.push(question);
        }
        responseHandler(request, response, questionList, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }

}

