/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_KEY = exports.API_KEY = 'AIzaSyB8gKeYHVGeDb6c-lNJlr7XNb99IP48K5c';

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _conf = __webpack_require__(1);

console.log(_conf.API_KEY); // import QRCode from '../lib/qrcode.min.js'
// require('../lib/qrcode.min.js')

// Key to goo.gl URL Shortener
// const API_KEY = 'AIzaSyB8gKeYHVGeDb6c-lNJlr7XNb99IP48K5c'


var NUMBER_OF_TOP_STORIES = 4;

// 1000 milliseconds * 60 seconds * 30 minutes
var REFRESH_RATE = 1000 * 60 * 30;

fetchTopStories();
setInterval(fetchTopStories, REFRESH_RATE);

function fetchTopStories() {
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function (response) {
    return response.json();
  }).then(function (allTopStories) {
    var topStories = [];
    var storiesProcessed = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = allTopStories.splice(0, 30)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var storyID = _step.value;

        fetch('https://hacker-news.firebaseio.com/v0/item/' + storyID + '.json').then(function (response) {
          return response.json();
        }).then(function (storyJson) {
          topStories.push(storyJson);

          if (topStories.length > NUMBER_OF_TOP_STORIES) {
            topStories.sort(function (a, b) {
              return a.score < b.score;
            });
            topStories.splice(NUMBER_OF_TOP_STORIES, 1);
          }

          storiesProcessed++;
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var renderCheck = setInterval(function () {
      if (storiesProcessed < 30) return;else {
        renderTopStories(topStories);
        clearInterval(renderCheck);
      }
    }, 100);
  });
}

function renderTopStories(topStories) {

  $('#story-table').children().remove();

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var story = _step2.value;

      $('#story-table').append('\n      <tr class="story-row">\n        <td class="story-qr">\n          <div id="story-id-' + story.id + '"></div>\n        </td>\n        <td class="story-title-container">\n          <h2 class="story-title">' + story.title + '</h2>\n          <h4 class="story-url">' + story.url + '</h4>\n        </td>\n      </tr>\n    ');

      fetch('https://www.googleapis.com/urlshortener/v1/url?key=' + _conf.API_KEY, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 'longUrl': story.url || 'https://news.ycombinator.com/item?id=' + story.id })
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var elem = document.getElementById('story-id-' + story.id);
        new QRCode(elem, {
          text: json.id,
          width: 128,
          height: 128,
          colorDark: '#BCE784',
          colorLight: '#5DD39E'
        });
      });
    };

    for (var _iterator2 = topStories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/***/ }
/******/ ]);