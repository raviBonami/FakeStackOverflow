
const redirectHandler = (request,response, redirectedRoute) => {
    console.log("Inside redirect handler......");
    response.redirect(`${redirectedRoute}`)
    
}

export default redirectHandler;
