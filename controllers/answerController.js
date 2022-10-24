import { ObjectID } from 'bson';
import questionModel from "../model/questionSchema.js";
import answerModel from '../model/answerSchema.js';
import userModel from '../model/userSchema.js';
import { responseHandler } from "../utitlity/responseHandler.js";
import {ERROR_MESSAGE, ACCESS_DENIED, INVALID_USER} from '../constants/constants.js';

export const getAnswers = async (request, response) => {
    try {
        const questionId = request.params.questionId;
        const answerList = await answerModel.find({ questionId: questionId });
        response.send(answerList);
        responseHandler(request, response, answerList, 200, null,null,null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 500);
    }
}


export const postAnswerFromId = async (request, response) => {
    try{
        const decode = request.jwt;
        if(!decode){
            responseHandler(request, response, null, null, INVALID_USER, ACCESS_DENIED, 403);
        }
        const {title, username, description} = request.body;
        let newQuestionId = new ObjectID(request.params.questionId);
        const question = await questionModel.findById(newQuestionId);
        const newAnswer = new answerModel({title, username, description, questionId:newQuestionId})
        await newAnswer.save();
    
        // Adding newly posted answer to users answers list
        const user = await userModel.updateOne({username:username}, {$addToSet : {answers: newAnswer}})
    
        const newAnswerId = newAnswer._id;
        question.answer.push(newAnswerId);
        question.save();
        // response.send(request.body);
        responseHandler(request, response, request.body, 200, null, null, null);
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
   
}
