const Tool = require('./tool')


async function getSetting(){

    const setting = await require('./controllers/settings/read')()

    const tool = new Tool()
    const date = tool.getKhDate(new Date())

    const settings = {}
    settings.date = date
    settings.message = ''

    if(setting){
        settings.siteTitle = setting.siteTitle
        settings.description = setting.description
        settings.dLogo = setting.dLogo
        settings.dItemLimit = setting.dItemLimit
        settings.indexPostLimit = setting.indexPostLimit
        settings.categoryPostLimit = setting.categoryPostLimit
    }else{
        settings.siteTitle = 'ទូរទស្សន៍​យើង'
        settings.description = 'ព័ត៌មាន ចំណេះដឹង វប្បធម៌ កំសាន្ត'
        settings.dLogo = 'ទំព័រ​គ្រប់គ្រង'
        settings.dItemLimit = 10
        settings.indexPostLimit = 13
        settings.categoryPostLimit = 20
    }

    return settings
}


module.exports = getSetting()