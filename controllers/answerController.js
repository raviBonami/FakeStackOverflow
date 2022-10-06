

const getAnswers = (request, response) => {
    response.render('answerViews/answer')
}

const postAnswer = (request, response) => {
    response.render('answerViews/postAnswer')
}

module.exports = {
    getAnswers,
    postAnswer
}