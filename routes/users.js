var express = require('express')
var router = express.Router()
var session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()



router.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI })
}))

const loginRoute = require('./users/login')
router.use('/', loginRoute) 

const postRoute = require('./users/post')
router.use('/post', postRoute) 

const categoryRoute = require('./users/category')
router.use('/category', categoryRoute) 

const pageRoute = require('./users/page')
router.use('/page', pageRoute) 

const bookRoute = require('./users/book')
router.use('/book', bookRoute) 



module.exports = router