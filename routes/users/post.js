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

        const count = await require('../../controllers/posts/count')()
        settings.message = `ចំនួន​ការផ្សាយ​សរុបៈ ${count}`
        const read = await require('../../controllers/posts/read')

        if(req.session.user.role === 'Admin'){
            settings.items = await read(settings.dItemLimit)
        }else{
            settings.items = await read(settings.dItemLimit, null, null, req.session.user.userid)
        }
        
        settings.route = 'post'
        
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

router.get('/edit/:id', async function(req, res, next) {
    if(req.session.user){
        settings.dLogo = 'ទំព័រ​កែប្រែ​ការផ្សាយ'
        const post = await require('../../controllers/posts/read')(false, req.params.id)

        if((req.session.user.role === 'Admin') || (req.session.user.userid === post.author)){
            settings.categories = await require('../../controllers/categories/read')('all')
        
            const date = post.date.toLocaleDateString('fr-CA')
            const time = post.date.toLocaleTimeString('it-IT')
            settings.datetime = date + 'T' +  time
            settings.post = post
            settings.route = 'post'

            res.render('users/edit_post', settings)
        }else{
            res.redirect('/users/post')
        }

    }else{
        res.redirect('/users')
    }
})

router.post('/edit/:id', async function(req, res, next){
    if(req.session.user){
        await require('../../controllers/posts/update')(req)
        
        res.redirect('/users/post/edit/' + req.params.id)
    }else{
        res.redirect('/users')
    }
})

router.get('/delete/:id', async function(req, res, next){
    if(req.session.user){
        const post = await require('../../controllers/posts/read')(false, req.params.id)

        if((req.session.user.role === 'Admin') || (req.session.user.userid === post.author)){
            await require('../../controllers/posts/delete')(req)
        }
  
        res.redirect('/users/post')
  
    }else{
        res.redirect('/users')
    }
})

router.post('/paginate', async function(req, res, next){
    if(req.session.user){
        const read = await require('../../controllers/posts/read')

        if(req.session.user.role === 'Admin'){
            settings.items = await read(settings.dItemLimit, null, req.body.page)
        }else{
            settings.items = await read(settings.dItemLimit, null, req.body.page, req.session.user.userid)
        }

        res.json({items: settings.items})
    }else{
        res.redirect('/users')
    }
})



module.exports = router