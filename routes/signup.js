
import express from 'express';
import {getSignupPage} from '../controllers/signupController.js'
import {signupUser} from '../controllers/userController.js';
import {requestSchemaValidation, userSchemaValidation} from '../utitlity/validateUser.js' 

const signupRoute = express.Router();
signupRoute.use(express.urlencoded({extended : true}))
signupRoute.use(express.json())

signupRoute.get('/',getSignupPage);
signupRoute.post('/',userSchemaValidation, signupUser);

export default signupRoute
    
