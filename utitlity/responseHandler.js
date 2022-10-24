import { ERROR_MESSAGE,SUCCESSFULLY_EXECUTED  } from "../constants/constants.js";

export const responseHandler = (request, response, success,successStatus, error, errorMessage,errorStatus) => {
    if(error){
        if(errorStatus == null || errorMessage == null){
            return response.status(404).send(ERROR_MESSAGE);
        }
        return response.status(errorStatus).send(errorMessage);
    }else{
        if(successStatus == null || success == null){
            return response.status(200).send(SUCCESSFULLY_EXECUTED);
        }
        return response.status(successStatus).send(success);
    }
}