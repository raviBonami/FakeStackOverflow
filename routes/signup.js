
const express = require('express')
const {getSignupPage} = require('../controllers/signupController')

const signupRoute = express.Router();
signupRoute.use(express.urlencoded({extended : true}))
signupRoute.use(express.json())

signupRoute.get('/',getSignupPage)

module.exports = {
    signupRoute
}