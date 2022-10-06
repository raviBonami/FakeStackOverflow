const express = require('express')
const answerRoutes = express.Router();
const {getAnswers, postAnswer} = require('../controllers/answerController')


answerRoutes.use(express.urlencoded({extended : true}))

answerRoutes.get('/',getAnswers)
answerRoutes.get('/post',postAnswer)

module.exports = {
    answerRoutes
}