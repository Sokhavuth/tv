const schema = require('./schema')



async function deletePost(req){
    const postSchema = await schema()

    const post = await postSchema.findOne({id: req.params.id})
    await postSchema.deleteOne({id: req.params.id})
    return post
}

  

module.exports = deletePost