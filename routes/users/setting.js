var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next){
    var settings = await require('../../settings')
    
    if(req.session.user){
        settings.dLogo = 'ទំព័រ​ Setting'

        res.render('users/setting', settings)
    }else{
        res.redirect('/users')
    }
})

router.post('/', async function(req, res, next){
    if(req.session.user){
        await require('../../controllers/settings/update')(req)

        res.redirect('/users/setting')
    }else{
        res.redirect('/users')
    }
})



module.exports = router