// https://api.lyrics.ovh/suggest/summer

const searchBtn = document.getElementById('search-button');
const input = document.getElementById('input-value');

searchBtn.addEventListener('click', ()=> {
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then(res => res.json())
    .then(lyrics => {
        getLyrics(lyrics);
        input.value = '';
    })
})

const getLyrics = (lyrics) =>{
    const lyrics10 = lyrics.data.slice(0, 10);
    document.getElementById('lyrics-show').innerText = '';
    for (let i = 0; i < lyrics10.length; i++) {
        const lyrics = lyrics10[i];
        const title = lyrics.title
        const author = lyrics.artist.name
        const img = lyrics.artist.picture

        showLyricsDisplay(title, author, img);
    }
}

const showLyricsDisplay = (title, author, img) => {
    let lyricsShow = document.getElementById('lyrics-show');


    lyricsShow.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${title}</h3>
                                    <p class="author lead">Album by <span>${author}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button class="btn btn-success" onclick="singleLyrcisDiplay('${author}', '${title}')">Get Lyrics</button>
                                </div>
                                <img class='rounded' src=${img} alt="">
                            </div>`
}


function singleLyrcisDiplay(author, title){
    fetch(`https://api.lyrics.ovh/v1/${author}/${title}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('lyrics-title').innerText = `${title} ${author}`;
        document.getElementById('paragraph-lyrics').innerText =  data.lyrics;
        if(data.lyrics === undefined){
            document.getElementById('paragraph-lyrics').innerText = "No lyrics here"
        }
    })
}
