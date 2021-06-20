function setVideo(video){
    let html = ''

    if(video[0].type === 'YouTube'){
        html += `<div class="video">`
        html += `<iframe frameborder='0' allowfullscreen src="https://www.youtube.com/embed/${video[0].id}"></iframe>`
        html += `</div>`
    }
    
    return html
}
