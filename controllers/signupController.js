
import { responseHandler } from "../utitlity/responseHandler.js";
import { ERROR_MESSAGE } from "../constants/constants.js";
const SIGNUP_PAGE = "Inside sign up page";

export const getSignupPage = (request, response) => {
    try{
        responseHandler(request, response, SIGNUP_PAGE, 200, null, null, null);
    }catch(error){
        responseHandler(request, response, null, null, error, ERROR_MESSAGE, 501);
    }
}
