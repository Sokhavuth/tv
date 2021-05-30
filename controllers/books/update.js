const schema = require('./schema')



async function updateBook(req){
    const bookSchema = await schema()

    const book = await bookSchema.findOne({id: req.params.id})

    book.title = req.body.title
    book.content = req.body.content
    book.thumb = req.body.thumb
    book.video = req.body.entries
    book.chapter = req.body.chapter
    book.date = new Date(req.body.datetime)
  
    return await book.save()
  }



module.exports = updateBook