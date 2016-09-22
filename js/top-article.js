const NUMBER_OF_TOP_STORIES = 5

// 1000 milliseconds * 60 seconds * 30 minutes
const REFRESH_RATE = 1000 * 60 * 30

fetchTopStories()
setInterval(fetchTopStories, REFRESH_RATE)

function fetchTopStories() {
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then(allTopStories => {
      let topStories = []
      for (let storyID of allTopStories.splice(0, 30)) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${ storyID }.json`)
          .then(response => response.json())
          .then(storyJson => {

            topStories.push(storyJson)

            if (topStories.length > NUMBER_OF_TOP_STORIES) {
              topStories.sort((a, b) => a.score < b.score)
              topStories.splice(NUMBER_OF_TOP_STORIES, 1)
            }
          })
          .then(() => {
            renderTopStories(topStories)
          })
      }
    })


}

function renderTopStories(topStories) {

  $('#story-table').children().remove()

  for (let story of topStories) {
    $('#story-table').append(`
      <tr>
        <td class="story-qr">
          <canvas id="story-id-${ story.id }"></canvas>
        </td>
        <td class="story-title">
          <h2>${ story.title }</h2>
          <h4>${ story.url }</h4>
        </td>
      </tr>
    `)
    new QRCode(document.getElementById(`story-id-${ story.id }`), story.url, {

    })
  }

}
