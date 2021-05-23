const schema = require('./schema')

async function countCategory(){
    const categorySchema = await schema()

    return await categorySchema.countDocuments({})
}

module.exports = countCategory