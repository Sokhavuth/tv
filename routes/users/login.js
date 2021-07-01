var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next) {
    var settings = await require('../../settings')
    settings.dLogo = 'ទំព័រ​គ្រប់គ្រង'
    settings.message = ''
  
    if(req.session.user){
      const count = await require('../../controllers/posts/count')()
      settings.message = `ចំនួន​ការផ្សាយ​សរុបៈ ${count}`
      const read = await require('../../controllers/posts/read')

      settings.items = await read(14)
      settings.route = 'post'

      res.render('users/index', settings)
    }else{
      res.render('login', settings)
    }
})
  
router.post('/', async function(req, res, next){
    var settings = await require('../../settings')
    const checkUser = require('../../controllers/users/checkUser')
    const result = await checkUser(req)
    settings.message = result.message
  
    if(result.success){
      const count = await require('../../controllers/posts/count')()
      settings.message = `ចំនួន​ការផ្សាយ​សរុបៈ ${count}`
      const read = await require('../../controllers/posts/read')

      settings.items = await read(14)
      settings.route = 'post'

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