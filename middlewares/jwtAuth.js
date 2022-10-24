
import jwt from 'jsonwebtoken';
import { responseHandler } from '../utitlity/responseHandler.js';
import { ERROR_MESSAGE, ACCESS_DENIED } from '../constants/constants.js';

export const authorization = (request, response, next) => {
    if(request.headers['authorization']){
        try{
            let authorization = request.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return responseHandler(request, response, null, null, "Invalid Request",ACCESS_DENIED, 401);
            }else{
                request.jwt = jwt.verify(authorization[1],process.env.ACCESS_TOKEN_SECRET);
                return next();
            }

        }catch(error){
            return responseHandler(request, response, null, null, "Invalid Token", ACCESS_DENIED, 403);
        }
    }else{
        return responseHandler(request, response, null, null, "Invalid Request", ACCESS_DENIED, 401);
    }
}
