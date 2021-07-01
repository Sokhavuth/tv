var express = require('express')
var router = express.Router()



router.post('/', async function(req, res, next){
    if(req.session.user){
        const settings = await require('../../settings') 
        settings.dLogo = "ទំព័រ​ស្វែង​រក"

        if(req.body.search_item === 'ការផ្សាយ'){
            settings.results = await require('../../controllers/posts/search')(req.body.q)
            settings.route = 'post'
        }else if(req.body.search_item === 'ជំពូក'){
            settings.results = await require('../../controllers/categories/search')(req.body.q)
            settings.route = 'category'
        }else if(req.body.search_item === 'ទំព័រ​ស្តាទិក'){
            settings.results = await require('../../controllers/pages/search')(req.body.q)
            settings.route = 'page'
        }else if(req.body.search_item === 'សៀវភៅ'){
            settings.results = await require('../../controllers/books/search')(req.body.q)
            settings.route = 'book'
        }else if(req.body.search_item === 'អ្នក​ប្រើប្រាស់'){
            settings.results = await require('../../controllers/users/search')(req.body.q)
            settings.route = 'user'
        }
        
        res.render('users/search', settings)
    }else{
        res.redirect('/users')
    }
})



module.exports = router