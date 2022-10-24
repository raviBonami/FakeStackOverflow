
import userModel from '../model/userSchema.js';
import questionModel from '../model/questionSchema.js';
import answerModel from '../model/answerSchema.js';
import errorHandler from '../utitlity/errorHandler.js';
import redirectHandler from '../utitlity/redirectHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responseHandler } from '../utitlity/responseHandler.js';
import { ERROR_MESSAGE , ACCESS_DENIED, INVALID_USER} from '../constants/constants.js';

const SIGNUP_ERROR = 'User not added. Something went wrong';
const LOGIN_ERROR = "Couldn't log you in. Something went wrong"

export const signupUser = async (request, response) => {
    try {
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
            responseHandler(request, response, null, null, "Invalid User", ACCESS_DENIED, 403);
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




// plato
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBsYXRvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2NjYyNTY3NTQsImV4cCI6MTY2NjI5Mjc1NH0.4R-PPDqCPfYxGqYIDw1YzaoxQh-Gr1A_qjAyPIHtX6k



// user2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2NjYyNTc1MDcsImV4cCI6MTY2NjI5MzUwN30.rNggI-N3ypl1mNyUvjCL6OPvKA0CUUUm2W34sDhkpWE

// judas
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1ZGFzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2NjYyNjYwODksImV4cCI6MTY2NjMwMjA4OX0.ExUEBcX6u4Cs36JQTx18gF_bivzuT0I4z3DQ-KR8JiY

  // const user = request.params;
    // console.log(user, "--------user---------")
    // console.log(user.username);
    // console.log(request.headers['authorization'].split(" ")[1],"---------")
    // const token = request.headers['authorization'].split(" ")[1];
    // const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);