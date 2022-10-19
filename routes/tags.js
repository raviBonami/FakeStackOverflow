const express = require('express');
const tagRoutes = express.Router();

tagRoutes.use(express.urlencoded({extended : true}))
tagRoutes.use(express.json())

const {getTag, getAllQuestionOfTag} = require('../controllers/tagController')

tagRoutes.get("/",getTag);
tagRoutes.get("/:tagname", getAllQuestionOfTag);

module.exports = {
    tagRoutes
}