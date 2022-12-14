import express from 'express';
const tagRoutes = express.Router();

tagRoutes.use(express.urlencoded({extended : true}))
tagRoutes.use(express.json())

import {getTag, getAllQuestionOfTag} from '../controllers/tagController.js';

tagRoutes.get("/",getTag);
tagRoutes.get("/:tagname", getAllQuestionOfTag);

export default tagRoutes
