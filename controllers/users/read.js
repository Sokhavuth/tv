const schema = require('./schema')



async function getUser(amount=10, id=false, page=0, userid=null){
    const userSchema = await schema()

    if(userid){
        var querry = {author: userid}
    }else{
        var querry = {}
    }

    if(id){
        return await userSchema.findOne({userid: id})
    }else if(page){
        return await userSchema.find(querry).skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else{
        return await userSchema.find(querry).sort({date: -1, _id: -1}).limit(amount)
    }
}



module.exports = getUser