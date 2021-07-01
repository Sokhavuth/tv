const schema = require('./schema')

async function searchPage (q) {
    const pageSchema = await schema()
  
    var pages = await pageSchema.find({ $text : { $search : q } }).sort({ date: -1, _id: -1 }).limit(20)
    return  pages
  
}

module.exports = searchPage