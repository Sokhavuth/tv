const schema = require('./schema')



async function deleteUser(req){
    const userSchema = await schema()

    const user = await userSchema.findOne({userid: req.params.id})
    await userSchema.deleteOne({userid: req.params.id})
    return user
}

  

module.exports = deleteUser