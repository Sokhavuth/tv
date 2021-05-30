const schema = require('./schema')



async function deleteBook(req){
    const bookSchema = await schema()

    const book = await bookSchema.findOne({id: req.params.id})
    await bookSchema.deleteOne({id: req.params.id})
    return book
}

  

module.exports = deleteBook