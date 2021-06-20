function setVideo(video){
    let html = ''

    if(video[0].type === 'YouTube'){
        html += `<div class="video">`
        html += `<iframe frameborder='0' allowfullscreen src="https://www.youtube.com/embed/${video[0].id}"></iframe>`
        html += `</div>`
    }else if(video[0].type === 'Facebook'){
        html += `<div class="video">`
        html += `<div class="fb-video" data-href="https://www.facebook.com/watch/?v=${video[0].id}" data-width="auto" data-show-captions="true"></div>`
        html += `</div>`
    }

    if(video.length > 1){
        html += `<div class="playlist">`

        for(let v in video){
            html += `<div class="episode">`
            html += `<img src="/images/playlist.jpg" />`
            html += `<div class="label">ភាគ​ទី ${++v}</div>`
            html += `</div>`
        }

        html += `</div>`
    }
    
    return html
}
