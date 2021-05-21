const mongoose = require('mongoose')
var session = require('express-session')
const MongoStore = require('connect-mongo')


async function setDbConnection(app) {
    require('dotenv').config()
    const databaseAccess = process.env.DATABASE_URI
    process.env.TZ = "Asia/Phnom_Penh"

  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(databaseAccess, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })

  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: databaseAccess })
  }))
}

module.exports = setDbConnection