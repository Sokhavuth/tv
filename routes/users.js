var express = require('express')
var router = express.Router()


router.get('/', function(req, res, next) {
  const setDbConnection =  require('../tool')
  setDbConnection(router)
  res.render('login', { siteTitle: 'Khmer Web TV' })
});

module.exports = router
