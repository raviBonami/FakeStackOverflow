

const GET_HOME_PATH = 'homeView/home';

const getHome = (request, response) => {
    response.render(GET_HOME_PATH)
}


module.exports = {
    getHome
}