
const redirectHandler = (request,response, redirectedRoute) => {
    response.redirect(`${redirectedRoute}`)
}

module.exports = {
    redirectHandler
}