

const getAllQuestions = (request, response) => {
    response.render('questionViews/question')
}

const postQuestion = (request, response) => {
    response.render('questionViews//postQuestion')
}

module.exports = {
    getAllQuestions,
    postQuestion
}