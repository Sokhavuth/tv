const schema = require('./schema')



async function createSetting(req){
    const settingSchema = await schema()

    const siteTitle = req.body.siteTitle
    const dItemLimit = req.body.dItemLimit
    const indexPostLimit = req.body.indexPostLimit
    const categoryPostLimit = req.body.categoryPostLimit

    const setting = new settingSchema({siteTitle: siteTitle, dItemLimit: dItemLimit, 
        indexPostLimit: indexPostLimit, categoryPostLimit: categoryPostLimit})
        
    return await setting.save()
}



module.exports = createSetting