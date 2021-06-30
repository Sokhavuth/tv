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


router.get('/', async function(req, res, next) {
    const settings = await require('../settings')
    const read = await require('../controllers/posts/read')
    settings.posts = await read(settings.indexPostLimit)

    res.render('index', settings)
});

router.get('/post/:id', async function(req, res, next){
    const settings = await require('../settings')
    const read = require('../controllers/posts/read')
    settings.post = await read(false, req.params.id)
    settings.user = await req.session.user

    console.log(settings.user)

    res.render('single', settings)
})



module.exports = router