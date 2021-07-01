const schema = require('./schema')

async function searchPost (q) {
    const postSchema = await schema()
  
    var posts = await postSchema.find({ $text : { $search : q } }).sort({ postdate: -1, _id: -1 }).limit(20)
    return  posts
  
}

module.exports = searchPost