// import QRCode from '../lib/qrcode.min.js'
// require('../lib/qrcode.min.js')

// Key to goo.gl URL Shortener
// const API_KEY = 'AIzaSyB8gKeYHVGeDb6c-lNJlr7XNb99IP48K5c'
import { API_KEY } from '../conf.js'
console.log(API_KEY);

const NUMBER_OF_TOP_STORIES = 4

// 1000 milliseconds * 60 seconds * 30 minutes
const REFRESH_RATE = 1000 * 60 * 30

fetchTopStories()
setInterval(fetchTopStories, REFRESH_RATE)

function fetchTopStories() {
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then(allTopStories => {
      let topStories = []
      let storiesProcessed = 0
      for (let storyID of allTopStories.splice(0, 30)) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${ storyID }.json`)
          .then(response => response.json())
          .then(storyJson => {
            topStories.push(storyJson)

            if (topStories.length > NUMBER_OF_TOP_STORIES) {
              topStories.sort((a, b) => a.score < b.score)
              topStories.splice(NUMBER_OF_TOP_STORIES, 1)
            }

            storiesProcessed++
          })
      }
      let renderCheck = setInterval(() => {
        if (storiesProcessed < 30) return
        else {
          renderTopStories(topStories)
          clearInterval(renderCheck)
        }
      }, 100)
    })
}

function renderTopStories(topStories) {

  $('#story-table').children().remove()

  for (let story of topStories) {
    $('#story-table').append(`
      <tr class="story-row">
        <td class="story-qr">
          <div id="story-id-${ story.id }"></div>
        </td>
        <td class="story-title-container">
          <h2 class="story-title">${ story.title }</h2>
          <h4 class="story-url">${ story.url }</h4>
        </td>
      </tr>
    `)

    fetch('https://www.googleapis.com/urlshortener/v1/url?key=' + API_KEY, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ 'longUrl': story.url || 'https://news.ycombinator.com/item?id=' + story.id})
    })
    .then(response => response.json())
    .then(json => {
      let elem = document.getElementById(`story-id-${ story.id }`)
      new QRCode(elem, {
        text: json.id,
        width: 128,
        height: 128,
        colorDark : '#BCE784',
        colorLight : '#5DD39E'
      })
    })
  }

}
