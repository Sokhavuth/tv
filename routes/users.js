var express = require('express')
var router = express.Router()
var settings = require('../settings')
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
  settings.dLogo = 'ទំព័រ​គ្រប់គ្រង'
  settings.message = ''

  if(req.session.user){
    res.render('users/index', settings)
  }else{
    res.render('login', settings)
  }
})

router.post('/', async function(req, res, next){
  const checkUser = require('../controllers/users/checkUser')
  const result = await checkUser(req)
  settings.message = result.message

  if(result.success){
    res.render('users/index', settings)
  }else{
    res.render('login', settings)
  }

})

router.get('/logout', async function(req, res, next) {
  req.session.destroy(function(err) {
      console.log('Session was destroyed')
   })
  res.redirect('/')
})

router.get('/post', async function(req, res, next) {
  settings.dLogo = 'ទំព័រ​ការផ្សាយ'

  if(req.session.user){
    res.render('users/post', settings)
  }else{
    res.redirect('/login')
  }
})

router.get('/category', async function(req, res, next) {
  if(req.session.user){
    settings.dLogo = 'ទំព័រ​ជំពូក'

    const today = new Date()
    const date = today.toLocaleDateString('fr-CA')
    const time = today.toLocaleTimeString('it-IT')
    settings.datetime = date + 'T' +  time

    const count = await require('../controllers/categories/count')()
    settings.message = `ចំនួន​ជំពូក​សរុបៈ ${count}`
    settings.route = 'category'
    settings.items = await require('../controllers/categories/read')(settings.dItemLimit)

    res.render('users/category', settings)
  }else{
    res.redirect('/login')
  }
}) 

router.post('/category', async function(req, res, next){
  if(req.session.user){
    if(req.session.user.role === 'Admin'){
      await require('../controllers/categories/create')(req)
    }

    res.redirect('/users/category')

  }else{
    res.redirect('/login')
  }
})

module.exports = router
