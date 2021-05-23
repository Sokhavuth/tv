const schema = require('./schema')


module.exports = async (req) => {
    const categorySchema = await schema()

    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

    category = new categorySchema({ 
        id: id, 
        label: req.body.label,
        thumb: req.body.thumb,
        date: new Date(req.body.datetime)
    })

    const _category = await category.save()

    return _category
}