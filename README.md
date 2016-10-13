### CS Crew

 - JW - Attendance stats for the day?
 - LP - CS Challenge of the day
 - LP - Poll?
 - JW - Article of the day (Top on HN)
 - EW - CS events calendar (embedded google cal)
 - JW - Carousel scrolls through different ajax calls

### How to make Pages

 1. You get a `<section>` to work with
 2. Make a file called `your-page.html` in the `pages` folder  
 3. Make a file called `your-page.js` in the `js` folder  
 4. Make a file called `your-page.css` in the `css` folder  
 5. These are the files you get to work with.  `main.js` in the `js` folder uses an array of pages names to make `fetch` requests for each `your-page.html`, `your-page.js`, `your-page.css`.    
 6. The contents of `your-page.html` will be inserted into a `<section>` element with the id `section-your-page`.  
 7. Your javascript will run globally, please only change things that are relevant to your section.  
 8. Your CSS file will also run globally.  Please only make CSS that's relevant to your section
 9. You have access to Bootstrap - a very nice CSS library.  Please use Bootsrap, it's great.

**replace "your-page" with your actual page name to properly follow the steps above**

### How to develop
 1. Start a local server by opening the repo in your terminal and running `python3 -m http.server` OR `python -m SimpleHTTPServer`
 2. Open [localhost:8000](localhost:8000) in your browerser
 3. Run `webpack --watch` in another terminal tab/window.  This will transpile your javascript ES6 code into ES5 code.


### Libraries/APIs
 - jQuery
 - d3
 - Bootstrap
 - Chart.js https://github.com/chartjs/Chart.js
 - https://github.com/davidshimjs/qrcodejs
 - http://kenwheeler.github.io/slick/
 - https://github.com/HackerNews/API
