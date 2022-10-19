const questionModel = require('../model/questionSchema')
const tagModel = require('../model/tagSchema')

const getTag = (request, response) => {
    response.send("Inside tag routes .....//////////")
}

const getAllQuestionOfTag = async (request, response) => {
    const tagname = request.params.tagname;
    let tagInDb = await tagModel.findOne({name:tagname});
    let questionList = [];
    for(let i=0;i<tagInDb.question.length;i++){
        const question = await questionModel.findById(tagInDb.question[i]);
        questionList.push(question.title);
    }
    // console.log(questionList, " ------------list of questions-------")
    response.send(questionList);
}

module.exports = {
    getTag,
    getAllQuestionOfTag
}