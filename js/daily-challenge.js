// import snoowrap from '../lib/snoowrap.min.js'
const snoowrap = require('../lib/snoowrap.min.js');

console.log(require('../lib/snoowrap.min.js'));

const r = new snoowrap({})

console.log(r.getSubmission('2np694').body);
