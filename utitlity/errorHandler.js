

const errorHandler = (request, response,err,completeStr, errStr) => {
    if(err){
        response.send(errStr)
    }else{
        response.send(completeStr)
    }
}



module.exports = {
    errorHandler
}