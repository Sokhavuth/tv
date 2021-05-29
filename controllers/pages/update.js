const schema = require('./schema')



async function updatePage(req){
    const pageSchema = await schema()

    const page = await pageSchema.findOne({id: req.params.id})

    page.title = req.body.title
    page.content = req.body.content
    page.thumb = req.body.thumb
    page.video = req.body.entries
    page.date = new Date(req.body.datetime)
  
    return await page.save()
  }



module.exports = updatePage