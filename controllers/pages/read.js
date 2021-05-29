const schema = require('./schema')



async function getPage(amount=10, id=false, page=0){
    const pageSchema = await schema()

    if(id){
        return await pageSchema.findOne({id: id})
    }else if(page){
        return await pageSchema.find().skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else{
        return await pageSchema.find().sort({date: -1, _id: -1}).limit(amount)
    }
}



module.exports = getPage