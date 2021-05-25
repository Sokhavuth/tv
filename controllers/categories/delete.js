const schema = require('./schema')


async function deleteCategory(req){
    const categorySchema = await schema()

    const category = await categorySchema.findOne({id: req.params.id})
    await categorySchema.deleteOne({id: req.params.id})
    return category
  }


module.exports = deleteCategory