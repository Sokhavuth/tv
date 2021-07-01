const schema = require('./schema')

async function searchBook (q) {
    const bookSchema = await schema()
  
    var books = await bookSchema.find({ $text : { $search : q } }).sort({ date: -1, _id: -1 }).limit(20)
    return  books
  
}

module.exports = searchBook