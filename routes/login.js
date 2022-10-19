
const express = require('express');
const loginRoute = express.Router();

const session = require('express-session')
// const MongoSession = require('connect-mongodb-session')(session)
const {getLoginPage} = require('../controllers/loginController')
const {signupUser,loginUser} = require('../controllers/userController')
const {store} = require('../config/databaseConfig/sessionConfig')
const {logoutUser} = require('../controllers/userController')


loginRoute.use(express.urlencoded({extended : true}))
loginRoute.use(express.json())

const SECRET = "qwertyuiop";

loginRoute.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

loginRoute.get('/',getLoginPage)
loginRoute.post('/', loginUser)
loginRoute.post('/user/logout',logoutUser)

module.exports = loginRoute