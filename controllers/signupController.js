
const GET_SIGNUP_PATH = 'signupView/signup'

const getSignupPage = (request, response) => {
    response.render(GET_SIGNUP_PATH)
}

module.exports = {
    getSignupPage
}