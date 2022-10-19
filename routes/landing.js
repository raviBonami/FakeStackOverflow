const {getHome} = require('../controllers/landingController')
const {getLoginPage} = require('../controllers/loginController')
const {getSignupPage} = require('../controllers/signupController')
const {signupUser} = require('../controllers/userController')
const {requestSchemaValidation, userSchemaValidation} = require('../utitlity/validateUser')
const {accessDenied} = require('../controllers/accessDenied')
const {store} = require('../config/databaseConfig/sessionConfig')

const express = require('express')
const landingRoutes = express.Router();
landingRoutes.use(express.json())

landingRoutes.use(express.urlencoded({extended : true}))


landingRoutes.get('/',getHome)
landingRoutes.get('/accessDenied',accessDenied )
landingRoutes.post('/signup',userSchemaValidation, requestSchemaValidation, signupUser)

module.exports = {
    landingRoutes
}