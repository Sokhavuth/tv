const schema = require('./schema')

async function countUser(){
    const userSchema = await schema()

    return await userSchema.countDocuments({})
  }

module.exports = countUser