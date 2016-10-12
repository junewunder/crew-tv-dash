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

let id, pageName
let functionChain = [
  response => response.text(),
  htmlText => $('#main-section').slick('slickAdd', `<section id="${ id }">${ htmlText }</section>`),
  _ => $.getScript(`/build/${ pageName }.js`),
  _ => $('head').append(`<link rel="stylesheet" href="/css/${ pageName }.css" type="text/css"/>`),
  _ => $('.slick-list')[0].style = ''
]

for (pageName of pages) {
  id = `section-${ pageName }`
  let promise = fetch(`/pages/${ pageName }.html`)
  functionChain.map(func => promise = promise.then(func))
}
