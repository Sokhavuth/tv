const schema = require('./schema')



async function getPost(amount=10, id=false, page=0, userid=null){
    const postSchema = await schema()

    if(userid){
        var querry = {author: userid}
    }else{
        var querry = {}
    }

    if(id){
        return await postSchema.findOne({id: id})
    }else if(page){
        return await postSchema.find(querry).skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else{
        return await postSchema.find(querry).sort({date: -1, _id: -1}).limit(amount)
    }
}



module.exports = getPost