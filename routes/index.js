var express = require('express')
var router = express.Router()
const settings = require('../settings')
const Tool = require('../tool')

router.get('/', async function(req, res, next) {
    const tool = new Tool()
    const date = tool.getKhDate(new Date())
    settings.date = date

    const read = require('../controllers/posts/read')
    settings.posts = await read(settings.indexPostLimit)

    res.render('index', settings)
});

module.exports = router
