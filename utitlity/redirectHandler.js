
const redirectHandler = (request,response, redirectedRoute) => {
    response.redirect(`${redirectedRoute}`)
    
}

export default redirectHandler;
