var express = require('express')
var router = express.Router()
const settings = require('../settings')
const Tool = require('../tool')
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
    const tool = new Tool()
    const date = tool.getKhDate(new Date())
    settings.date = date

    const read = require('../controllers/posts/read')
    settings.posts = await read(settings.indexPostLimit)

    res.render('index', settings)
});

router.get('/post/:id', async function(req, res, next){
    const read = require('../controllers/posts/read')
    settings.post = await read(false, req.params.id)
    settings.user = await req.session.user

    console.log(settings.user)

    res.render('single', settings)
})



module.exports = router
