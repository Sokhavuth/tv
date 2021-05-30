const schema = require('./schema')



async function createBook(req){
    const bookSchema = await schema()

    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    const title = req.body.title
    const content = req.body.content
    const thumb = req.body.thumb
    const video = req.body.entries
    const chapter = req.body.chapter
    const date = new Date(req.body.datetime)
    const author = req.session.user.userid

    const book = new bookSchema({id: id, title: title, content: content, thumb: thumb,
        video: video, chapter: chapter, date: date, author: author})
        
    return await book.save()
}



module.exports = createBook