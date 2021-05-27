const schema = require('./schema')



async function createPost(req){
    const psotSchema = await schema()

    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    const title = req.body.title
    const content = req.body.content
    const video = req.body.entries
    const category = req.body.category
    const date = new Date(req.body.datetime)
    const author = req.session.user.userid

    const post = new psotSchema({id: id, title: title, content: content, video: video, category: category, date: date, author: author})
    return await post.save()
}



module.exports = createPost