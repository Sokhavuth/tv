var express = require('express')
var router = express.Router()
const setDbConnection =  require('../tool')


router.get('/', function(req, res, next) {
  setDbConnection(router)
  res.render('login', { siteTitle: 'Khmer Web TV' })
});

module.exports = router
