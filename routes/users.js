import express from 'express';
const userRoutes = express.Router();
import {getAllUsers, getUserQuestion, getUserAnswers} from '../controllers/userController.js';
import {authorization} from '../middlewares/jwtAuth.js';

userRoutes.use(express.urlencoded({extended : true}))
userRoutes.use(express.json())  

userRoutes.get("/", getAllUsers);
userRoutes.get("/questions/:username", authorization, getUserQuestion);
userRoutes.get("/answers/:username",authorization, getUserAnswers);

export default userRoutes
