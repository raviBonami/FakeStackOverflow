const express = require('express')
const userRoutes = express.Router();
const {getAllUsers, getUserQuestions} = require('../controllers/userController')

userRoutes.use(express.urlencoded({extended : true}))
userRoutes.use(express.json())

userRoutes.get("/", getAllUsers);
userRoutes.get("/:username",getUserQuestions)

module.exports = {
    userRoutes
}