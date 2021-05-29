const schema = require('./schema')



async function countPage(){
    const pageSchema = await schema()

    return await pageSchema.countDocuments({})
}



module.exports = countPage