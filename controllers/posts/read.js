const schema = require('./schema')



async function getPost(amount=10, id=false, page=0){
    const postSchema = await schema()

    if(id){
        return await postSchema.findOne({id: id})
    }else if(page){
        return await postSchema.find().skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else{
        return await postSchema.find().sort({date: -1, _id: -1}).limit(amount)
    }
}



module.exports = getPost