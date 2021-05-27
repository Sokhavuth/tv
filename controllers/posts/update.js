const schema = require('./schema')



async function updatePost(req){
    const postSchema = await schema()

    const post = await postSchema.findOne({id: req.params.id})

    post.title = req.body.title
    post.content = req.body.content
    post.thumb = req.body.thumb
    post.video = req.body.entries
    post.category = req.body.category
    post.date = new Date(req.body.datetime)
  
    return await post.save()
  }



module.exports = updatePost