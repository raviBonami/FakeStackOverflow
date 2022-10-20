const { ObjectID } = require('bson');
const express = require('express')
const answerRoutes = express.Router();
const {getAnswers, postAnswer, postAnswerFromId} = require('../controllers/answerController')
const questionModel = require("../model/questionSchema")
const answerModel = require('../model/answerSchema')
const {authorization} = require('../middlewares/jwtAuth')

answerRoutes.use(express.urlencoded({extended : true}))

answerRoutes.get('/',getAnswers)
answerRoutes.get('/post',postAnswer)

answerRoutes.post("/:questionId",authorization, postAnswerFromId);

module.exports = {
    answerRoutes
}