import {ACCESS_DENIED, ERROR_MESSAGE} from '../constants/constants.js'
import { responseHandler } from "../utitlity/responseHandler.js";

export const accessDenied = (request, response) => {
    try{
        responseHandler(request, response, ACCESS_DENIED, 403, null, null, null);
    }catch(err){
        responseHandler(request, response, "", "", err, ERROR_MESSAGE, 501);
    }
}


