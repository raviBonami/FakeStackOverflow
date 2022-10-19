
const isAuth = (request, response, next) => {
    if(request.session.isAuth){
        next();
    }else{
        response.redirect('/accessDenied')
    }
}

module.exports = {
    isAuth
}

