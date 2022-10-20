const express = require('express')
const userRoutes = express.Router();
const {getAllUsers, getUserQuestion, getUserAnswers} = require('../controllers/userController')
const {authorization} = require('../middlewares/jwtAuth')

userRoutes.use(express.urlencoded({extended : true}))
userRoutes.use(express.json())

userRoutes.get("/", getAllUsers);
userRoutes.get("/questions/:username", authorization, getUserQuestion);
userRoutes.get("/answers/:username",authorization, getUserAnswers);

module.exports = {
    userRoutes
}