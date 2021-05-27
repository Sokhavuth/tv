const schema = require('./schema')


module.exports = async (req) => {
    const categorySchema = await schema()

    var id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

    category = new categorySchema({ 
        id: id, 
        title: req.body.title,
        thumb: req.body.thumb,
        date: new Date(req.body.datetime)
    })

    const _category = await category.save()

    return _category
}