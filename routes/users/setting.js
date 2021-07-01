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
    var settings = await require('../../settings')

    if(req.session.user){
        const setting = await require('../../controllers/settings/update')(req)
        
        settings.siteTitle = setting.siteTitle
        settings.description = setting.description
        settings.dLogo = 'ទំព័រ​ Setting'
        settings.dItemLimit = setting.dItemLimit
        settings.indexPostLimit = setting.indexPostLimit
        settings.categoryPostLimit = setting.categoryPostLimit

        res.render('users/setting', settings)
    }else{
        res.redirect('/users')
    }
})



module.exports = router