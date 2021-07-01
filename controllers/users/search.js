const schema = require('./schema')

async function searchUser (q) {
    const userSchema = await schema()
  
    var users = await userSchema.find({ $text : { $search : q } }).sort({ date: -1, _id: -1 }).limit(20)
    return  users
  
}

module.exports = searchUser