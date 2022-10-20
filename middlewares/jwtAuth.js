require('dotenv').config();
const jwt = require('jsonwebtoken')

const authorization = (request, response, next) => {
    if(request.headers['authorization']){
        try{
            let authorization = request.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return response.status(401).send("Invalid Request");
            }else{
                request.jwt = jwt.verify(authorization[1],process.env.ACCESS_TOKEN_SECRET);
                return next();
            }

        }catch(error){
            return response.status(403).send("Invalid Token")
        }
    }else{
        return response.status(401).send("Invalid Request")
    }
}

module.exports = {
    authorization
}