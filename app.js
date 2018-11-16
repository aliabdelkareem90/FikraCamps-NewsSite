import 'babel-polyfill' // we should install babel-polyfill and import it to make parcel support async

document.addEventListener('DOMContentLoaded', () => {
    let search = document.getElementById('search')
    search.addEventListener('keyup', () => {
        if (event.key === 'Enter') {
            getNews(search.value)
            
        }
    })
    getNews('iraq')
})

// ES6 Promises fetch and then
// function getNews(query) {
//     fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=ea74d2ab35164ad9b48bb00d80a22edd`)
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         let content = data.articles.map(createArticle).join('\n')
//         updateUI(content)
//     })
// }

// ES7 async and await (we should install babel-polyfill and import it to make parcel support async)
async function getNews (query) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=ea74d2ab35164ad9b48bb00d80a22edd`)
    let content = await response.json()
    // if user typed unknown word, the response article has no length
    if (content.articles.length == 0) {
        alert('No data')
    }
    updateUI(content.articles.map(createArticle).join('\n'))
}

function updateUI(content) {
    document.getElementById('news').innerHTML = content
}

function createArticle(article, i) {
    article.counter = 0
    return `
        <article id="${i}">
            <div>
                <img src="${article.urlToImage}" alt="" height="124" width="124">
            </div>
            <div class="article-text" id="text">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <time>${article.publishedAt}</time>
            </div>
            <div id="voter">
                <img height="13px" id="up" src="${require('./assets/upvote.svg')}" alt="" onclick="changeCount('counter${i}', 'up')">
                <div id="counter${i}">${article.counter}</div>
                <img height="13px" src="${require('./assets/downvote.svg')}" alt="" onclick="changeCount('counter${i}', 'down')">
            </div>
        </article>
    `
}

window.changeCount = (id, btnId) => {

    if (btnId == 'up') {
        document.getElementById(id).innerText = parseInt(document.getElementById(id).innerText) + 1 
    } else if (btnId == 'down') {
        if (parseInt(document.getElementById(id).innerText) > 0) {
            document.getElementById(id).innerText = parseInt(document.getElementById(id).innerText) - 1 
        } else {
            document.getElementById(id).innerText = 0
        }
    }
     
};


