import $ from 'jquery';
import jQuery from 'jquery';

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

require('../lib/slick.min.js')

const pages = ['test', 'test2']

$('#main-section').slick()

for (const pageName of pages) {
  const id = `section-${pageName}`
  fetch('/pages/' + pageName + '.html')
    .then((response) => {

      return response.text()

    }) .then((htmlText) => {

      $('#main-section').slick('slickAdd', `<section id="${id}">${htmlText}</section>`)
      // $('#'+id).html(htmlText)

    })
}
