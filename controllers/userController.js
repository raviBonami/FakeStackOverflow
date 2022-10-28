
import userModel from '../model/userSchema.js';
import questionModel from '../model/questionSchema.js';
import answerModel from '../model/answerSchema.js';
import errorHandler from '../utitlity/errorHandler.js';
import redirectHandler from '../utitlity/redirectHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responseHandler } from '../utitlity/responseHandler.js';
import { ERROR_MESSAGE , ACCESS_DENIED, INVALID_USER, USER_NOT_FOUND} from '../constants/constants.js';
import { requestSchemaValidation } from '../utitlity/validateUser.js';

const SIGNUP_ERROR = 'User not added. Something went wrong';
const LOGIN_ERROR = "Couldn't log you in. Something went wrong"

export const signupUser = async (request, response) => {
    try {
        requestSchemaValidation(request);
        const { username, email, password } = request.body
        let user = await userModel.findOne({ email })
        if (user) {
            return redirectHandler(request, response, "/login");
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        user = new userModel({
            username,
            email,
            password: hashedPassword
        })

        await user.save();
        redirectHandler(request, response, "/login");

    } catch (err) {
        errorHandler(request, response, err, "", SIGNUP_ERROR)
    }
}


// To login user
export const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return redirectHandler(response, "/login")
        }

        const match = await bcrypt.compare(password, user.password)
        const token = jwt.sign({ email: email, password: password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

        if (!match) {

            return response.redirect("/login");
        }

        request.session.isAuth = true;
        request.session.email = email;
        response.json({
            token: token
        })

    } catch (err) {
        errorHandler(request, response, err, "", LOGIN_ERROR)
    }

}


// To logout user
export const logoutUser = async (request, response) => {
    try {
        request.session.destroy((err) => {
            if (err) {
                throw new err;
            }
            response.redirect('/login');
        })
    } catch (error) {
        errorHandler(request, response, err, "", LOGIN_ERROR);
    }

}



// To get all users
export const getAllUsers = async (request, response) => {
    try {
        const users = await userModel.find({});
        responseHandler(request, response, users, 200, null, null, null);
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}


// Returns all questions posted by user
export const getUserQuestion = async (request, response) => {
    try {
        const decode = request.jwt;
        if (!decode) {
            responseHandler(request, response, null, null, INVALID_USER, ACCESS_DENIED, 403);
        }
        const foundUser = await userModel.findOne({ email: decode.email });

        const questionsIdList = foundUser.questions;
        let questions = [];
        questionsIdList.forEach(async (questionId) => {
            const question = await questionModel.findById(questionId);
            questions.push(question);
            if (questions.length === questionsIdList.length) {
                responseHandler(request, response, questions, 200, null, null, null);
            }
        })
    } catch (error) {
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }

}


// Returns all answers posted by user
export const getUserAnswers = async (request, response) => {
    try{
        const decode = request.jwt;
        if (!decode) {
            responseHandler(request, response, null, null, INVALID_USER, ACCESS_DENIED, 403);
        }
        const foundUser = await userModel.findOne({ email: decode.email });
        const answerIdList = foundUser.answers;
        let answers = [];
        answerIdList.forEach(async (answerId) => {
            const answer = await answerModel.findById(answerId);
            answers.push(answer);
            if (answers.length === answerIdList.length) {
                responseHandler(request, response, answers, 200, null, null, null);
            }
        })
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}

export const getUser = async (request, response) => {
    try{
        const {username} = request.params;
        const user = await userModel.findOne({username:username});
        if(user){
            responseHandler(request, response, user, 200, null, null, null);
        }else{
            responseHandler(request, response, null, null, USER_NOT_FOUND, USER_NOT_FOUND, 404);
        }
    }catch(error){  
        responseHandler(request, response, null, null, error, error, 501);
    }
    
    
}

export const getUserQuestionsAndAnswers = async (request, response) => {
    try{
        const {username} = request.params;
        const user = await userModel.findOne({username:username});
        const questionAndAnswers = {questions:user.questions, answers:user.answers};
        if(user){
            responseHandler(request, response, questionAndAnswers, 200, null, null, null);
        }else{
            responseHandler(request, response, null, null, USER_NOT_FOUND, USER_NOT_FOUND, 404);
        }
    }catch(error){  
        responseHandler(request, response, null, null, error, error, 501);
    }
    
    
}