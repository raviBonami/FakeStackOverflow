import express from 'express';
import { getAnswers,  postAnswerFromId, upvoteAnswer, downvoteAnswer } from '../controllers/answerController.js';
import {authorization} from '../middlewares/jwtAuth.js';
const answerRoutes = express.Router();

answerRoutes.use(express.urlencoded({ extended: true }))

answerRoutes.get('/:questionId', getAnswers);
answerRoutes.post("/:questionId", authorization, postAnswerFromId);
answerRoutes.post('/upvote/:answerId', authorization,upvoteAnswer );
answerRoutes.post('/downvote/:answerId', authorization,downvoteAnswer );

export default answerRoutes;