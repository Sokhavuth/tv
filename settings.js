const Tool = require('./tool')

const tool = new Tool()
const date = tool.getKhDate(new Date())

const settings = {}

settings.date = date
settings.siteTitle = 'ទូរទស្សន៍​យើង'
settings.dLogo = 'ទំព័រ​គ្រប់គ្រង'
settings.message = ''
settings.dItemLimit = 10
settings.indexPostLimit = 13

module.exports = settings