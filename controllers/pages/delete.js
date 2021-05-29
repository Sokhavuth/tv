const schema = require('./schema')



async function deletePage(req){
    const pageSchema = await schema()

    const page = await pageSchema.findOne({id: req.params.id})
    await pageSchema.deleteOne({id: req.params.id})
    return page
}

  

module.exports = deletePage