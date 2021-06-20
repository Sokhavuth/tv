var express = require('express')
var router = express.Router()

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

const uploadRoute = require('./users/upload')
router.use('/upload', uploadRoute) 

const userRoute = require('./users/user')
router.use('/user', userRoute) 



module.exports = router