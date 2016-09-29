import $ from 'jquery';
import jQuery from 'jquery';

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

require('../lib/slick.min.js')
require('bootstrap')

$('#main-section').slick({
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  appendDots: '#dots-container',
  dots: true,
})

const pages = ['attendance']

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
    .then(() => {
      $('.slick-list')[0].style = ''
    })
}
