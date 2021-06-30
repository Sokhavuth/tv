const schema = require('./schema')



async function getSetting(){
    const settingSchema = await schema()

    return await settingSchema.findOne()
    
}



module.exports = getSetting