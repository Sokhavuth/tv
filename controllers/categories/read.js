const schema = require('./schema')


async function getCategory(amount=10, id=false, page=0){
    const categorySchema = await schema()

    if(id){
        return await categorySchema.findOne({id: id})
    }else if(page){
        return await categorySchema.find().skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else if(amount === 'all'){
        return await categorySchema.find({}, {label: 1, _id: 0}).sort({label: 1})
    }else{
        return await categorySchema.find().sort({date: -1, _id: -1}).limit(amount)
    }
}


module.exports = getCategory