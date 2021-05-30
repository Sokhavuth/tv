const schema = require('./schema')



async function getBook(amount=10, id=false, page=0, userid=null){
    const bookSchema = await schema()

    if(userid){
        var querry = {author: userid}
    }else{
        var querry = {}
    }

    if(id){
        return await bookSchema.findOne({id: id})
    }else if(page){
        return await bookSchema.find(querry).skip(amount * page).sort({date: -1, _id: -1}).limit(amount)
    }else{
        return await bookSchema.find(querry).sort({date: -1, _id: -1}).limit(amount)
    }
}



module.exports = getBook