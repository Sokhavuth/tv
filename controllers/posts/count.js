const schema = require('./schema')



async function countPost(){
    const postSchema = await schema()

    return await postSchema.countDocuments({})
}



module.exports = countPost