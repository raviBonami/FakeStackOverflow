
// const session = require('express-session')
import session from 'express-session';
// const MongoSession = require('connect-mongodb-session')(session)
import MongoDB from 'connect-mongodb-session';
const MongoSession = MongoDB(session);

const URI = 'mongodb://localhost:27017/fakeStackOverflow';
const COLLECTIONS = "userlist";

const store = new MongoSession({
    uri: URI,
    collection: COLLECTIONS
})

export default store