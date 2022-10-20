const express = require('express');
const tagRoutes = express.Router();

tagRoutes.use(express.urlencoded({extended : true}))
tagRoutes.use(express.json())
const {authorization} = require('../middlewares/jwtAuth')

const {getTag, getAllQuestionOfTag} = require('../controllers/tagController')

tagRoutes.get("/",getTag);
tagRoutes.get("/:tagname", authorization, getAllQuestionOfTag);

module.exports = {
    tagRoutes
}