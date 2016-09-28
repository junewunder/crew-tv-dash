import $ from 'jquery';
import jQuery from 'jquery';

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

require('../lib/slick.min.js')
require('bootstrap')

$('#main-section').slick({
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  appendDots: '#dots-container',
  dots: true,
})

const pages = ['top-article']//, 'test', 'test2']

for (const pageName of pages) {
  const id = `section-${ pageName }`
  fetch(`/pages/${ pageName }.html`)
    .then((response) => response.text())
    .then((htmlText) => {
      $('#main-section').slick(
        'slickAdd',
        `<section id="${ id }">${ htmlText }</section>`
      )
    })
    .then(() => {
      $.getScript(`/build/${ pageName }.js`)
    })
    .then(() => {
      $('head').append(`<link rel="stylesheet" href="/css/${ pageName }.css" type="text/css"/>`);
    })
    .then(() => $('.slick-list')[0].style = '')
}

// Navbar Date
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function updateDate() {
  let date = new Date(Date.now())
  $('#nav-date').text(`${ DAYS[date.getDay()] }, ${ MONTHS[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`)
  setTimeout(updateDate, ONE_DAY_IN_MS + 10)
}

updateDate()
let date = new Date(Date.now())
let midnightTomorrow = (new Date(`${ date.getMonth() + 1 } ${ date.getDate() + 1 } ${ date.getFullYear() }`)).valueOf()
setTimeout(updateDate, midnightTomorrow - Date.now())
