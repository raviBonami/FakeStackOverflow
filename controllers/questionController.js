

const GET_QUESTION_PATH = 'questionViews/question';
const POST_QUESTION_PATH = 'questionViews//postQuestion'

const questionModel = require('../model/questionSchema');
const tagModel = require('../model/tagSchema');
const answerModel = require('../model/answerSchema');
const userModel = require('../model/userSchema')

const getAllQuestions = (request, response) => {
    response.render(GET_QUESTION_PATH)
}

const getPostQuestion = (request, response) => {
    response.render(POST_QUESTION_PATH)
}

const postQuestion = async (request, response) => {
     // # To add the questions - 
     const {title, username,description,tag, answer} = request.body;

     // To check if mentioned tag exists or not,  if exists ignore, if not add it in tags array
     for(let i=0;i<tag.length;i++){
         const newTag = tagModel(tag[i]);
         let findTag = await tagModel.findOne({name: newTag.name})
         if(!findTag){
             await newTag.save();
         }
     }
 
     // create new array
     let newTagIdArr = [];
 
     // Finding tag id of all mentioned tags and adding it in questions tag array
     for(let i=0;i<tag.length;i++){
         const newTag = tagModel(tag[i]);
         const findtag = await tagModel.find({name:newTag.name});
         let tagId = findtag[0]._id;
         newTagIdArr.push(tagId)
         
     }
 
     // Adding newly created question in questions collections - 
     const questionToBeAdded= new questionModel({title,username,description,tag:newTagIdArr,answer});
     await questionToBeAdded.save();

     // Adding questionID to the user who posted this - 
    const user = await userModel.updateOne({username: username}, {$addToSet : {questions: questionToBeAdded}});

     // Adding questionID in their respective tags
     for(let i=0;i<newTagIdArr.length;i++){
         const tag = await tagModel.findById(newTagIdArr[i]);
         tag.question.push(questionToBeAdded._id);
         await tag.save();
 
     }
 
     response.send("In post question------")
}

const getAnswers = async (request, response) => {
    const questionId = request.params.questionId;
    const answerList = await answerModel.find({questionId:questionId});
    response.send(answerList);
}

const getAllQuestionFromTag = async (request, response) => {
    console.log("Inside get tags func");
    const tagName = request.params.tagname;
    // console.log(typeof tagName)
    // console.log(tagName);
    const tag = await tagModel.findOne({name:tagName});
    console.log(tag);
    const questionArray = [];
    tag.question.forEach(async (questionId) => {
        const question = await questionModel.findById(questionId);
        questionArray.push(question);
        if(questionArray.length === tag.question.length){
            response.send(questionArray);
        }
    })
}



module.exports = {
    getAllQuestions,
    getPostQuestion,
    postQuestion,
    getAnswers,
    getAllQuestionFromTag
}