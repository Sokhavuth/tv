var express = require('express')
var router = express.Router()
var settings = require('../../settings')



router.get('/', async function(req, res, next) {
    settings.dLogo = 'ទំព័រ​ការផ្សាយ'
  
    if(req.session.user){
        const today = new Date()
        const date = today.toLocaleDateString('fr-CA')
        const time = today.toLocaleTimeString('it-IT')
        settings.datetime = date + 'T' +  time

        settings.categories = await require('../../controllers/categories/read')('all')
        
        res.render('users/post', settings)
    }else{
        res.redirect('/users')
    }
})

router.post('/', async function(req, res, next) {
    if(req.session.user){
        await require('../../controllers/posts/create')(req)
        res.redirect('/users/post')
    }else{
        res.redirect('/users')
    }
})



module.exports = router