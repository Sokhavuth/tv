var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next) {
    var settings = await require('../../settings')

    settings.dLogo = 'ទំព័រ​អ្នក​ប្រើប្រាស់'
  
    if(req.session.user){
        const today = new Date()
        const date = today.toLocaleDateString('fr-CA')
        const time = today.toLocaleTimeString('it-IT')
        settings.datetime = date + 'T' +  time

        const count = await require('../../controllers/users/count')()
        settings.message = `ចំនួន​អ្នក​ប្រើប្រាស់​​សរុបៈ ${count}`
        const read = await require('../../controllers/users/read')

        settings.items = await read(settings.dItemLimit)
        
        settings.route = 'user'
        
        res.render('users/user', settings)
    }else{
        res.redirect('/users')
    }
})

router.post('/', async function(req, res, next) {
    if(req.session.user){
        if(req.session.user.role === 'Admin'){
            await require('../../controllers/users/create')(req)
        }

        res.redirect('/users/user')
    }else{
        res.redirect('/users')
    }
})

router.get('/edit/:id', async function(req, res, next) {
    var settings = await require('../../settings')

    if(req.session.user){
        settings.dLogo = 'ទំព័រ​កែប្រែ​អ្នក​ប្រើប្រាស់'
        const user = await require('../../controllers/users/read')(false, req.params.id)

        if((req.session.user.role === 'Admin') || (req.session.user.userid === user.userid)){
            const date = user.date.toLocaleDateString('fr-CA')
            const time = user.date.toLocaleTimeString('it-IT')
            settings.datetime = date + 'T' +  time
            settings.user = user
            settings.route = 'user'

            res.render('users/edit_user', settings)
        }else{
            res.redirect('/users/user')
        }

    }else{
        res.redirect('/users')
    }
})

router.post('/edit/:id', async function(req, res, next){
    if(req.session.user){
        await require('../../controllers/users/update')(req)
        res.redirect('/users/user/edit/' + req.params.id)
    }else{
        res.redirect('/users')
    }
})

router.get('/delete/:id', async function(req, res, next){
    if(req.session.user){
        const post = await require('../../controllers/users/read')(false, req.params.id)

        if(req.session.user.role === 'Admin'){
            await require('../../controllers/users/delete')(req)
        }
  
        res.redirect('/users/user')
  
    }else{
        res.redirect('/users')
    }
})

router.post('/paginate', async function(req, res, next){
    var settings = await require('../../settings')
    
    if(req.session.user){
        const read = await require('../../controllers/users/read')
        settings.items = await read(settings.dItemLimit, null, req.body.page)

        res.json({items: settings.items})
    }else{
        res.redirect('/users')
    }
})




module.exports = router