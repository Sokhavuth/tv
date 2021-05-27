const schema = require('./schema')


async function updateCategory(req){
    const categorySchema = await schema()

    const category = await categorySchema.findOne({id: req.params.id})
    category.title = req.body.title,
    category.thumb = req.body.thumb,
    category.date = new Date(req.body.datetime)
  
    return await category.save()
  }


module.exports = updateCategory