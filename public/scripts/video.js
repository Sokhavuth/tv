function setActive(index, type){
    let html = ''

    if(type === 'YouTube'){
        html += `<div class="video">`
        html += `<iframe frameborder='0' allowfullscreen src="https://www.youtube.com/embed/${video[index].id}"></iframe>`
        html += `</div>`
    }else if(type === 'Facebook'){
        html += `<div class="video">`
        html += `<div class="fb-video" data-href="https://www.facebook.com/watch/?v=${video[index].id}" data-width="auto" data-show-captions="true"></div>`
        html += `</div>`
    }

    return html
}

var __click__ = ''

function setVideo(video){
    var index = video.length-1
    var html = setActive(index, video[index].type)
    __click__ = index

    if(video.length > 1){
        html += `<div class="playlist">`

        for(let v=video.length; v>0; v--){
            index = v - 1
            if(v === video.length){
                html += `<div id="${index}" onClick="setScreen(${index}, '${video[index].type}')" class="episode active">`
            }else{
                html += `<div id="${index}" onClick="setScreen(${index}, '${video[index].type}')" class="episode">`
            }
            
            html += `<img src="/images/playlist.jpg" />`

            if(video[v-1].ending === 'ចប់​ហើយ'){
                html += `<div class="label">ភាគ​ទី ${v} ចប់</div>`
            }else{
                html += `<div class="label">ភាគ​ទី ${v}</div>`
            }
            
            html += `</div>`
        }

        html += `</div>`
    }
    
    return html
}

function setScreen(index, type){
    let html = ''
    $('#'+__click__).attr('class', 'episode')
    __click__ = index
    $('#'+__click__).attr('class', 'episode active')

    if(type === 'YouTube'){
        html += `<iframe frameborder='0' allowfullscreen src="https://www.youtube.com/embed/${video[index].id}"></iframe>`
    }else if(type === 'Facebook'){
        html += `<div class="fb-video" data-href="https://www.facebook.com/watch/?v=${video[index].id}" data-width="auto" data-show-captions="true"></div>`
    }

    $('.video').html(html)
    if((type === 'Facebook') && (fb_api)){
        FB.XFBML.parse();
    }
      
}
