var express = require('express')
var router = express.Router()
var settings = require('../../settings')



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
    const checkUser = require('../../controllers/users/checkUser')
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


  
module.exports = router