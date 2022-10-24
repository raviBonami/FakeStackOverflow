import express from 'express';
import { getAnswers,  postAnswerFromId } from '../controllers/answerController.js';
import {authorization} from '../middlewares/jwtAuth.js';
const answerRoutes = express.Router();

answerRoutes.use(express.urlencoded({ extended: true }))

answerRoutes.get('/:questionId', getAnswers);
answerRoutes.post("/:questionId", authorization, postAnswerFromId);

export default answerRoutes;