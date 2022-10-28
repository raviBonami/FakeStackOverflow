import {accessDenied} from '../controllers/accessDenied.js';
import {getHome} from "../controllers/landingController.js"


import express from 'express';
const landingRoutes = express.Router();
landingRoutes.use(express.json())

landingRoutes.use(express.urlencoded({extended : true}))

landingRoutes.get('/',getHome)
landingRoutes.get('/accessDenied',accessDenied )

export default landingRoutes;
