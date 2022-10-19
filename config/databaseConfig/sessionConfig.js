
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)

const URI = 'mongodb://localhost:27017/fakeStackOverflow';
const COLLECTIONS = "userlist";

const store = new MongoSession({
    uri: URI,
    collection: COLLECTIONS
})

module.exports = {
    store
}