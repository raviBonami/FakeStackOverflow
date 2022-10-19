

const express = require('express')
const db = require('./database/database')
const {questionRoutes} = require('./routes/questions')
const {landingRoutes} = require('./routes/landing')
const {answerRoutes} = require('./routes/answers')
const loginRoute = require('./routes/login')
const {signupRoute} = require('./routes/signup')
const {tagRoutes} = require('./routes/tags')
const {userRoutes} = require('./routes/users')

const app = express();
app.set('view engine', 'ejs');


// Routes
app.use('/', landingRoutes);
app.use("/questions", questionRoutes);
app.use('/answers', answerRoutes);
app.use('/login',loginRoute);
app.use('/signup', signupRoute);
app.use('/tags',tagRoutes);
app.use('/user',userRoutes)


// Listening
app.listen(8000, () => {
    console.log("Listening at 8000... fake stack overflow")
})