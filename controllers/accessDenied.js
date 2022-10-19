
const ACCESS_DENIED_PATH = 'accessDenied/accessDenied';

const accessDenied = (request, response) => {
    response.render(ACCESS_DENIED_PATH)
}

module.exports = {
    accessDenied
}