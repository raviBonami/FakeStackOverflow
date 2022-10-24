

const HOME_SUCCESS = "Inside Home path"
import {responseHandler} from '../utitlity/responseHandler.js'
import {ERROR_MESSAGE} from '../constants/constants.js'

export const getHome = (request, response) => {
    try{
        responseHandler(request, response, HOME_SUCCESS, 200, null,null, null);
    }catch(error){
        responseHandler(request, response, null, null, error,ERROR_MESSAGE, 501);
    }

}

