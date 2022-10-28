
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const loginRoute = express.Router();

import session from 'express-session';
import {getLoginPage} from '../controllers/loginController.js';
import {signupUser,loginUser} from '../controllers/userController.js';
import store from '../config/databaseConfig/sessionConfig.js';
import {logoutUser} from '../controllers/userController.js';


loginRoute.use(express.urlencoded({extended : true}))
loginRoute.use(express.json())

loginRoute.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

loginRoute.get('/',getLoginPage)
loginRoute.post('/', loginUser)
loginRoute.post('/user/logout', logoutUser)

export default loginRoute;