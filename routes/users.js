var express = require('express')
var router = express.Router()


router.get('/', async function(req, res, next) {
  const settings = require('../settings')
  settings.message = ''
  res.render('login', settings)
})

router.post('/', async function(req, res, next){
  const settings = require('../settings')
  const checkUser = require('../controllers/users/checkUser')
  const result = await checkUser(req)
  settings.message = result.message

  if(result.success){
    res.render('users/index', settings)
  }else{
    res.render('login', settings)
  }

})

module.exports = router
