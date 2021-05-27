const schema = require('./schema')



async function countCategory(){
    const postSchema = await schema()

    return await postSchema.countDocuments({})
}



module.exports = countCategory