
const express = require('express')
const {getSignupPage} = require('../controllers/signupController')
const {signupUser} = require('../controllers/userController')

const signupRoute = express.Router();
signupRoute.use(express.urlencoded({extended : true}))
signupRoute.use(express.json())

signupRoute.get('/',getSignupPage);
// signupRoute.post(''
signupRoute.post('/',signupUser);

module.exports = {
    signupRoute
    
}