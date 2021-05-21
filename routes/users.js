var express = require('express')
var router = express.Router()


router.get('/', async function(req, res, next) {
  const setDbConnection =  require('../tool')
  const settings = require('../settings')

  await setDbConnection(router)
  res.render('login', settings)
});

module.exports = router
