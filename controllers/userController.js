require('dotenv').config();
const userModel = require('../model/userSchema');
const questionModel = require('../model/questionSchema');
const answerModel = require('../model/answerSchema');
const {errorHandler} = require('../utitlity/errorHandler');
const {redirectHandler} = require('../utitlity/redirectHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SIGNUP_ERROR = 'User not added. Something went wrong';
const LOGIN_ERROR = "Couldn't log you in. Something went wrong"
const SIGNUP_PATH = '/signup';
const LOGIN_PATH = '/login';

// To sign up user
const signupUser =  async (request, response) => {
    
    try{
        const {username, email, password} = request.body
        let user = await userModel.findOne({email})
        if(user){
            return redirectHandler(response,"/signup");
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        user = new userModel({
            username,
            email,
            password: hashedPassword
        })
        
        
        await user.save();
        console.log(user, "-------------------");
        redirectHandler(request, response,"/login");

    }catch(err){
        console.log(err)
        errorHandler(request, response,err,"",SIGNUP_ERROR)
    }
}


// To login user
const loginUser =  async (request, response) => {
    console.log("inside login.........");

    try{
        const {email, password} = request.body;
        const user = await userModel.findOne({email})

        if(!user){
            return redirectHandler(response,"/login")
        }

        const match = await bcrypt.compare(password, user.password)
        const token = jwt.sign({email: email,password:password}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10h"});

        if(!match){
            
            return response.redirect("/login");
        }

        request.session.isAuth = true;
        // response.redirect("/questions")
        response.json({
            token:token
        })

    }catch(err){
        console.log(err);
        errorHandler(request, response,err,"",LOGIN_ERROR)
    }

}


// To logout user
const logoutUser = async (request, response) => {
    request.session.destroy((err) => {
        if(err){
            throw new err;
        }
        response.redirect('/login')
    })
}



// To get all users
const getAllUsers = async (request, response) => {
    console.log("Inside get users")
    // response.send("----------");
    const users = await userModel.find({});
    response.send(users);

}


// Returns all questions posted by user
const getUserQuestion = async (request, response) => {
    const decode = request.jwt;
    if(!decode){
        response.send("Invalid User");
        response.end();
    }
    const foundUser = await userModel.findOne({email : decode.email});
    
    const questionsIdList = foundUser.questions;
    let questions = [];
    questionsIdList.forEach(async (questionId) => {
        const question = await questionModel.findById(questionId);
        questions.push(question);
        if(questions.length === questionsIdList.length){
            response.send(questions);
        }
    })
}


// Returns all answers posted by user
const getUserAnswers = async (request, response) => {
    const decode = request.jwt;
    if(!decode){
        response.send("Invalid User");
        response.end();
    }
    const foundUser = await userModel.findOne({email : decode.email});
    const answerIdList = foundUser.answers;
    let answers = [];
    answerIdList.forEach(async (answerId) => {
        const answer = await answerModel.findById(answerId);
        answers.push(answer);
        if(answers.length === answerIdList.length){
            response.send(answers);
        }
    })
}


module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserQuestion,
    getUserAnswers
}

// plato
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBsYXRvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2NjYyNTY3NTQsImV4cCI6MTY2NjI5Mjc1NH0.4R-PPDqCPfYxGqYIDw1YzaoxQh-Gr1A_qjAyPIHtX6k



// user2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2NjYyNTc1MDcsImV4cCI6MTY2NjI5MzUwN30.rNggI-N3ypl1mNyUvjCL6OPvKA0CUUUm2W34sDhkpWE



  // const user = request.params;
    // console.log(user, "--------user---------")
    // console.log(user.username);
    // console.log(request.headers['authorization'].split(" ")[1],"---------")
    // const token = request.headers['authorization'].split(" ")[1];
    // const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);