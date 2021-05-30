const schema = require('./schema')



async function countBook(){
    const bookSchema = await schema()

    return await bookSchema.countDocuments({})
}



module.exports = countBook