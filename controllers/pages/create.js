const schema = require('./schema')



async function createPage(req){
    const pageSchema = await schema()

    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    const title = req.body.title
    const content = req.body.content
    const thumb = req.body.thumb
    const video = req.body.entries
    const date = new Date(req.body.datetime)
    const author = req.session.user.username

    const page = new pageSchema({id: id, title: title, content: content, thumb: thumb,
        video: video, date: date, author: author})
        
    return await page.save()
}



module.exports = createPage