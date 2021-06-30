var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next) {
    var settings = await require('../../settings')

    settings.dLogo = 'ទំព័រ​សៀវភៅ'
  
    if(req.session.user){
        const today = new Date()
        const date = today.toLocaleDateString('fr-CA')
        const time = today.toLocaleTimeString('it-IT')
        settings.datetime = date + 'T' +  time
        
        const count = await require('../../controllers/books/count')()
        settings.message = `ចំនួន​សៀវភៅ​​សរុបៈ ${count}`
        const read = await require('../../controllers/books/read')

        if(req.session.user.role === 'Admin'){
            settings.items = await read(settings.dItemLimit)
        }else{
            settings.items = await read(settings.dItemLimit, null, null, req.session.user.userid)
        }
        
        settings.route = 'book'
        
        res.render('users/book', settings)
    }else{
        res.redirect('/users')
    }
})

router.post('/', async function(req, res, next) {
    if(req.session.user){
        await require('../../controllers/books/create')(req)
        res.redirect('/users/book')
    }else{
        res.redirect('/users')
    }
})

router.get('/edit/:id', async function(req, res, next) {
    var settings = await require('../../settings')

    if(req.session.user){
        settings.dLogo = 'ទំព័រ​កែប្រែ​សៀវភៅ'
        const book = await require('../../controllers/books/read')(false, req.params.id)

        if((req.session.user.role === 'Admin') || (req.session.user.userid === book.author)){
        
            const date = book.date.toLocaleDateString('fr-CA')
            const time = book.date.toLocaleTimeString('it-IT')
            settings.datetime = date + 'T' +  time
            settings.book = book
            settings.route = 'book'

            res.render('users/edit_book', settings)
        }else{
            res.redirect('/users/book')
        }

    }else{
        res.redirect('/users')
    }
})

router.post('/edit/:id', async function(req, res, next){
    if(req.session.user){
        await require('../../controllers/books/update')(req)
        res.redirect('/users/book/edit/' + req.params.id)
    }else{
        res.redirect('/users')
    }
})

router.get('/delete/:id', async function(req, res, next){
    if(req.session.user){
        const book = await require('../../controllers/books/read')(false, req.params.id)

        if((req.session.user.role === 'Admin') || (req.session.user.userid === book.author)){
            await require('../../controllers/books/delete')(req)
        }
  
        res.redirect('/users/book')
  
    }else{
        res.redirect('/users')
    }
})

router.post('/paginate', async function(req, res, next){
    var settings = await require('../../settings')
    
    if(req.session.user){
        const read = await require('../../controllers/books/read')

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