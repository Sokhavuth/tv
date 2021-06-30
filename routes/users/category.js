var express = require('express')
var router = express.Router()



router.get('/', async function(req, res, next) {
  var settings = await require('../../settings')

  if(req.session.user){
    settings.dLogo = 'ទំព័រ​ជំពូក'

    const today = new Date()
    const date = today.toLocaleDateString('fr-CA')
    const time = today.toLocaleTimeString('it-IT')
    settings.datetime = date + 'T' +  time

    const count = await require('../../controllers/categories/count')()
    settings.message = `ចំនួន​ជំពូក​សរុបៈ ${count}`
    settings.route = 'category'
    settings.items = await require('../../controllers/categories/read')(settings.dItemLimit)

    res.render('users/category', settings)
  }else{
    res.redirect('/users')
  }
}) 

router.post('/', async function(req, res, next){
  if(req.session.user){
    if(req.session.user.role === 'Admin'){
      await require('../../controllers/categories/create')(req)
    }

    res.redirect('/users/category')

  }else{
    res.redirect('/users')
  }
})

router.get('/edit/:id', async function(req, res, next){
  var settings = await require('../../settings')

  if(req.session.user){
    if(req.session.user.role === 'Admin'){
      settings.dLogo = 'ទំព័រ​កែប្រែ​ជំពូក'
      
      const category = await require('../../controllers/categories/read')(false, req.params.id)

      const date = category.date.toLocaleDateString('fr-CA')
      const time = category.date.toLocaleTimeString('it-IT')
      settings.datetime = date + 'T' +  time
      settings.category = category
      settings.route = 'category'
    }

    res.render('users/edit_category', settings)

  }else{
    res.redirect('/users')
  }
})

router.post('/edit/:id', async function(req, res, next){
  var settings = await require('../../settings')

  if(req.session.user){
    if(req.session.user.role === 'Admin'){
      settings.dLogo = 'ទំព័រ​កែប្រែ​ជំពូក'
      
      const category = await require('../../controllers/categories/update')(req)

      const date = category.date.toLocaleDateString('fr-CA')
      const time = category.date.toLocaleTimeString('it-IT')
      settings.datetime = date + 'T' +  time
      settings.category = category
      settings.route = 'category'
    }

    res.render('users/edit_category', settings)

  }else{
    res.redirect('/users')
  }
})

router.get('/delete/:id', async function(req, res, next){
  if(req.session.user){
    if(req.session.user.role === 'Admin'){
      await require('../../controllers/categories/delete')(req)
    }

    res.redirect('/users/category')

  }else{
    res.redirect('/users')
  }
})

router.post('/paginate', async function(req, res, next){
  var settings = await require('../../settings')

  if(req.session.user){
    const read = await require('../../controllers/categories/read')
    const categories = await read(settings.dItemLimit, false, req.body.page)
    res.json({items: categories})
  }else{
    res.redirect('/users')
  }
})



module.exports = router