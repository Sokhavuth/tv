const schema = require('./schema')


async function updateCategory(req){
    const categorySchema = await schema()

    const category = await categorySchema.findOne({id: req.params.id})
    category.label = req.body.label,
    category.thumb = req.body.thumb,
    category.date = new Date(req.body.datetime)
  
    return await category.save()
  }


module.exports = updateCategory