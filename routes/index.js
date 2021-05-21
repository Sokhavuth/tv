var express = require('express')
var router = express.Router()
const settings = require('../settings')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', settings)
});

module.exports = router
