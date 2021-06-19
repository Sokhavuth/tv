var express = require('express')
var router = express.Router()
const settings = require('../settings')
const Tool = require('../tool')

router.use('/', function(req, res, next){
    const tool = new Tool()
    const date = tool.getKhDate(new Date())
    settings.date = date
    next();
})

router.get('/', function(req, res, next) {
    res.render('index', settings)
});

module.exports = router
