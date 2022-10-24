
const isAuth = (request, response, next) => {
    if(request.session.isAuth){
        next();
    }else{
        response.redirect('/accessDenied')
    }
}

export default isAuth;


