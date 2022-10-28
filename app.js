
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import './database/database.js';
import questionRoutes from './routes/questions.js';
import landingRoutes from './routes/landing.js';
import answerRoutes from './routes/answers.js';
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import tagRoutes from './routes/tags.js';
import userRoutes from './routes/users.js';

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
app.listen(process.env.PORT_NUMBER, () => {
    console.log("Listening at 8000... fake stack overflow")
})