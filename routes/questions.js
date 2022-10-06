const express = require('express')
const questionRoutes = express.Router();

const {getAllQuestions, postQuestion} = require('../controllers/questionController')

questionRoutes.use(express.urlencoded({extended : true}))

questionRoutes.get('/',getAllQuestions)
questionRoutes.get('/post', postQuestion)

module.exports = {
    questionRoutes
}