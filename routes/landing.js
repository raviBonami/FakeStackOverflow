const express = require('express')
const landingRoutes = express.Router();

const {getHome} = require('../controllers/landingController')

landingRoutes.use(express.urlencoded({extended : true}))

landingRoutes.get('/',getHome)

module.exports = {
    landingRoutes
}