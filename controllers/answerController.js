const { ObjectID } = require('bson');
const GET_ANSWER_PATH = 'answerViews/answer';
const POST_ANSWER_PATH = 'answerViews/postAnswer';

const questionModel = require("../model/questionSchema");
const answerModel = require('../model/answerSchema');
const userModel = require('../model/userSchema');

const getAnswers = (request, response) => {
    response.render(GET_ANSWER_PATH)
}

const postAnswer = (request, response) => {
    response.render(POST_ANSWER_PATH)
}

const postAnswerFromId = async (request, response) => {
    console.log(request.params);
    const {title, username, description} = request.body;
    let newQuestionId = new ObjectID(request.params.questionId);
    const question = await questionModel.findById(newQuestionId);
    const newAnswer = new answerModel({title, username, description, questionId:newQuestionId})
    await newAnswer.save();

    // Adding newly posted answer to users answers list
    const user = await userModel.updateOne({username:username}, {$addToSet : {answers: newAnswer}})

    const newAnswerId = newAnswer._id;
    question.answer.push(newAnswerId);
    question.save();
    response.send(request.body);
}
module.exports = {
    getAnswers,
    postAnswer,
    postAnswerFromId
}