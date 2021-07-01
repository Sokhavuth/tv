const schema = require('./schema')

async function searchCategory (q) {
    const categorySchema = await schema()
  
    var categories = await categorySchema.find({ $text : { $search : q } }).sort({ date: -1, _id: -1 }).limit(20)
    return  categories
  
}

module.exports = searchCategory