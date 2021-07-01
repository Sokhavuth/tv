var page = 0

function paginate(route){
    $('.paginate img').attr('src', '/images/loading.gif')
    page += 1

    $.post(`/users/${route}/paginate`, {page: page}, function(data, status){
        appendItem(data.items, route)
    })
}

function appendItem(items, route){
    var html = ''

    for(let v in items){
        html += `<div class='item'>`
        
        html += `<div class='thumb'>`
        if(route === 'user'){
            html += `<a href='/${ route }/${ items[v].userid }'>`
        }else{
            html += `<a href='/${ route }/${ items[v].id }'>`
        }
        if(items[v].thumb){
            html += `<img src='${ items[v].thumb }' />`
        }else{
            html += `<img src='/images/userthumb.png' />`
        }
        if((items[v].video) && (items[v].video !== '')){
            html += `<img class='play-icon' src='/images/play.png' />`
        }
        html += `</a>`
        html += `</div>`

        html += `<div class='title-date'>`
        html += `<a class='title' href='/${ route }/${ items[v].id }'>${ items[v].title }</a>`
        html += `<div>${ (new Date(items[v].date)).toLocaleDateString() }</div>`
        html += `</div>`

        html += `<div class='edit-delete'>`
        html += `<a href='/users/${ route }/edit/${ items[v].id }'>`
        html += `<img src='/images/edit.png' />`
        html += `</a>`
        html += `<a href='/users/${ route }/delete/${ items[v].id }'>`
        html += `<img src='/images/delete.png' />`
        html += `</a>`
        html += `</div>`
        html += `</div>` 
    }
    
    $('.paginate img').attr('src', '/images/load-more.png')
    $('.item-wrapper').append(html)

}