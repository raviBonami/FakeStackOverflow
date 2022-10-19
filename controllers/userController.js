
const userModel = require('../model/userSchema')
const {errorHandler} = require('../utitlity/errorHandler')
const {redirectHandler} = require('../utitlity/redirectHandler')
const bcrypt = require('bcrypt')

const SIGNUP_ERROR = 'User not added. Something went wrong';
const LOGIN_ERROR = "Couldn't log you in. Something went wrong"

const signupUser =  async (request, response) => {
    
    try{
        const {username, email, password} = request.body
        let user = await userModel.findOne({email})
        if(user){
            return redirectHandler(response,'/signup')
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        user = new userModel({
            username,
            email,
            password: hashedPassword
        })

        await user.save();
        redirectHandler(request, response,'/login')

    }catch(err){
        errorHandler(request, response,err,"",SIGNUP_ERROR)
    }
}

const loginUser =  async (request, response) => {
    try{
        const {email, password} = request.body;
        const user = await userModel.findOne({email})

        if(!user){
            return redirectHandler(response,'/login')
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return response.redirect('/login')
        }
        request.session.isAuth = true;
        response.redirect("/questions")

    }catch(err){
        errorHandler(request, response,err,"",LOGIN_ERROR)
    }

}

const logoutUser = async (request, response) => {
    request.session.destroy((err) => {
        if(err){
            throw new err;
        }
        response.redirect('/login')
    })
}

const getAllUsers = async (request, response) => {
    console.log("Inside get users")
    // response.send("----------");
    const users = await userModel.find({});
    response.send(users);

}

const getUserQuestions = async (request, response) => {
    const user = request.params;
    
    response.send("777777777777777")
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getUserQuestions,
    getAllUsers
}