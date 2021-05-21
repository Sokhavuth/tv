var express = require('express')
var router = express.Router()


router.get('/', async function(req, res, next) {
  const settings = require('../settings')
  res.render('login', settings)
})

router.post('/', async function(req, res, next){
  const settings = require('../settings')
  const checkUser = require('../controllers/users/checkUser')
  const result = await checkUser(req)

  if(result.success){
    res.render('users/index', settings)
  }else{
    res.redirect('/users')
  }

})

module.exports = router
