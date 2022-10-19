
const GET_LOGIN_PATH = 'loginView/login'

const getLoginPage = (request, response) => {
    response.render(GET_LOGIN_PATH)
}

module.exports = {
    getLoginPage
}