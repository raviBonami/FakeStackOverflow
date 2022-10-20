const express = require('express');
const questionRoutes = express.Router();
const session = require('express-session')

const {
    getAllQuestions, 
    getPostQuestion, 
    postQuestion, 
    getAnswers,
    getAllQuestionFromTag
    } = require('../controllers/questionController')

const {isAuth} = require('../middlewares/isAuth')
const {store} = require('../config/databaseConfig/sessionConfig')
const questionModel = require('../model/questionSchema')
const answerModel = require('../model/answerSchema')
const tagModel = require('../model/tagSchema')
const {authorization} = require('../middlewares/jwtAuth')

questionRoutes.use(express.urlencoded({extended : true}))
questionRoutes.use(express.json())

questionRoutes.use(session({
    secret: "qwertyuiop",
    resave: false, 
    saveUninitialized: false,
    store: store
}))


// questionRoutes.get('/', isAuth, getAllQuestions)
questionRoutes.get('/', getAllQuestions);
questionRoutes.get('/post', getPostQuestion);
questionRoutes.post('/post',authorization, postQuestion);
questionRoutes.get('/:questionId',authorization, getAnswers);
questionRoutes.get('/tags/:tagname',authorization, getAllQuestionFromTag);

module.exports = {
    questionRoutes
}





















// To post a question - 
// questionRoutes.post('/post', async (request, response) => {
//     // console.log(request.body,"=========body===========")

//     // # To add the questions - 
//     const {title, username,description,tag, answer} = request.body;

//     // To check if mentioned tag exists or not,  if exists ignore, if not add it in tags array
//     for(let i=0;i<tag.length;i++){
//         const newTag = tagModel(tag[i]);
//         let findTag = await tagModel.findOne({name: newTag.name})
//         if(!findTag){
//             await newTag.save();
//         }
//     }

//     // create new array
//     let newTagIdArr = [];

//     // Finding tag id of all mentioned tags and adding it in questions tag array
//     for(let i=0;i<tag.length;i++){
//         const newTag = tagModel(tag[i]);
//         const findtag = await tagModel.find({name:newTag.name});
//         let tagId = findtag[0]._id;
//         newTagIdArr.push(tagId)
        
//     }

//     // Adding newly created question in questions collections - 
//     const questionToBeAdded= new questionModel({title,username,description,tag:newTagIdArr,answer});
//     await questionToBeAdded.save();
//     // console.log(questionToBeAdded,"..........")

//     // Add all questions in tags
//     // console.log(newTagIdArr);
//     // [
//         //     new ObjectId("633ffd349da3f11f64070b03"),
//         //     new ObjectId("634e492b88e4f43145270f7a")
//         //   ]
//     for(let i=0;i<newTagIdArr.length;i++){
//         // console.log(newTagIdArr[i], "------------");
//         // new ObjectId("633ffd349da3f11f64070b03") ------------
//         // new ObjectId("634e492b88e4f43145270f7a") ------------
//         const tag = await tagModel.findById(newTagIdArr[i]);
//         // console.log(tag, "----------------")
//         tag.question.push(questionToBeAdded._id);
//         await tag.save();


//         // const currTag = await tagModel.find({newTagIdArr[i]});
//         // newTag.question.push(questionToBeAdded._id);
//         // console.log(newTag, " new taggg-------");
//     }

//     response.send("In post question------")
// })
