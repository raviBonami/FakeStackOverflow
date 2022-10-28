import { ObjectID } from 'bson';
import questionModel from "../model/questionSchema.js";
import answerModel from '../model/answerSchema.js';
import userModel from '../model/userSchema.js';
import { responseHandler } from "../utitlity/responseHandler.js";
import {ERROR_MESSAGE, ACCESS_DENIED, INVALID_USER, CANNOT_POST_ANSWERS} from '../constants/constants.js';

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
        const postingUser = await userModel.findOne({username: username});
        if(postingUser && postingUser.points < 5){
            return responseHandler(request, response, null, null, CANNOT_POST_ANSWERS, CANNOT_POST_ANSWERS, 405)
        }
        
        let newQuestionId = new ObjectID(request.params.questionId);
        const question = await questionModel.findById(newQuestionId);
        const newAnswer = new answerModel({title, username, description, questionId:newQuestionId})
        await newAnswer.save();
    
        // Adding newly posted answer to users answers list
        const user = await userModel.updateOne({username:username}, {$addToSet : {answers: newAnswer}})
    
        const newAnswerId = newAnswer._id;
        question.answer.push(newAnswerId);
        question.save();
        responseHandler(request, response, request.body, 200, null, null, null);
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
   
}

export const upvoteAnswer = async (request, response) => {
    try{
        const decode = request.jwt;
        if (!decode) {
            return responseHandler(request, response, null, null, INVALID_USER,ACCESS_DENIED,403);
        }

        const answerId = request.params.answerId;
        const foundAnswer = await answerModel.findById(answerId);
        if(foundAnswer){
            const user = await userModel.findOne({email:decode.email});
            await answerModel.updateOne({_id:answerId},{$addToSet:{ upvotes: user._id }});
            await userModel.updateOne({email:decode.email}, {$inc : {points: 2 }});
            await userModel.updateOne({username : foundQuestion.username }, {$inc : {points: 5}});
        }
        responseHandler(request, response, foundAnswer, 200, null, null, null);
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}

export const downvoteAnswer = async (request, response) => {
    try{
        const decode = request.jwt;
        if (!decode) {
            return responseHandler(request, response, null, null, INVALID_USER,ACCESS_DENIED,403);
        }

        const answerId = request.params.answerId;
        const foundAnswer = await answerModel.findById(answerId);
        if(foundAnswer){
            const user = await userModel.findOne({email:decode.email});
            await answerModel.updateOne({_id:answerId}, {$addToSet : {downvotes : user._id}});
            await userModel.updateOne({email:decode.email}, {$inc : {points: 1 }});
            await userModel.updateOne({username : foundQuestion.username }, {$inc : {points: -1}});
        }
        responseHandler(request, response, foundAnswer, 200, null, null, null);
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}
