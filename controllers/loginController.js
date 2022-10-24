
const LOGIN_SUCCESS = "Inside Home path"
import {responseHandler} from '../utitlity/responseHandler.js'
import {ERROR_MESSAGE} from '../constants/constants.js'

export const getLoginPage = (request, response) => {
    try{
        console.log("Inside login route path---------")
        return responseHandler(request, response, LOGIN_SUCCESS, 200, null,null, null);
    }catch(error){
        return responseHandler(request, response, null, null, error,ERROR_MESSAGE, 501);
    }
}
