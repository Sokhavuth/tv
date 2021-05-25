var express = require('express')
var router = express.Router()
var settings = require('../../settings')



router.get('/', async function(req, res, next) {
    settings.dLogo = 'ទំព័រ​ការផ្សាយ'
  
    if(req.session.user){
      res.render('users/post', settings)
    }else{
      res.redirect('/users')
    }
  })



module.exports = router