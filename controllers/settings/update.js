const schema = require('./schema')



async function updateSetting(req){
    const settingSchema = await schema()

    const setting = await settingSchema.findOne({})

    setting.siteTitle = req.body.siteTitle
    setting.description = req.body.description
    setting.dItemLimit = req.body.dItemLimit
    setting.indexPostLimit = req.body.indexPostLimit
    setting.categoryPostLimit = req.body.categoryPostLimit
  
    return await setting.save()
  }



module.exports = updateSetting