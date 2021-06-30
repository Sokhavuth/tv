var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next) {
    var settings = await require('../../settings')

    settings.dLogo = 'ទំព័រ​ស្តាទិក'
  
    if(req.session.user){
        const today = new Date()
        const date = today.toLocaleDateString('fr-CA')
        const time = today.toLocaleTimeString('it-IT')
        settings.datetime = date + 'T' +  time

        const count = await require('../../controllers/pages/count')()
        settings.message = `ចំនួន​ទំព័រ​ស្តាទិក​សរុបៈ ${count}`
        
        const read = await require('../../controllers/pages/read')

        settings.items = await read(settings.dItemLimit)
        
        settings.route = 'page'
        
        res.render('users/page', settings)
    }else{
        res.redirect('/users')
    }
    
})

router.post('/', async function(req, res, next) {
    if(req.session.user.role === "Admin"){
        await require('../../controllers/pages/create')(req)
        res.redirect('/users/page')
    }else{
        res.redirect('/users')
    }
})

router.get('/edit/:id', async function(req, res, next) {
    var settings = await require('../../settings')

    if(req.session.user){
        if(req.session.user.role === 'Admin'){
            settings.dLogo = 'កែប្រែ​ទំព័រ​ស្តាទិក'
            const page = await require('../../controllers/pages/read')(false, req.params.id)
            const date = page.date.toLocaleDateString('fr-CA')
            const time = page.date.toLocaleTimeString('it-IT')
            settings.datetime = date + 'T' +  time
            settings.page = page
            settings.route = 'page'

            res.render('users/edit_page', settings)
        }else{
            res.redirect('/users/page')
        }

    }else{
        res.redirect('/users')
    }
})

router.post('/edit/:id', async function(req, res, next){
    if(req.session.user){
        await require('../../controllers/pages/update')(req)
        
        res.redirect('/users/page/edit/' + req.params.id)
    }else{
        res.redirect('/users')
    }
})

router.get('/delete/:id', async function(req, res, next){
    if(req.session.user){
        if(req.session.user.role === 'Admin'){
            await require('../../controllers/pages/delete')(req)
        }
  
        res.redirect('/users/page')
  
    }else{
        res.redirect('/users')
    }
})

router.post('/paginate', async function(req, res, next){
    var settings = await require('../../settings')
    
    if(req.session.user){
        const read = await require('../../controllers/pages/read')

        settings.items = await read(settings.dItemLimit, null, req.body.page)
        
        res.json({items: settings.items})
    }else{
        res.redirect('/users')
    }
})

module.exports = router