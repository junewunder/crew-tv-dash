let fs = require('fs')

function generateEntryPoints() {
  let entryPoints = {}

  let jsFiles = fs.readdirSync('/Users/JacobWunder/Documents/crew-tv-dash/js')
  for(const fileName of jsFiles) {
    let name = fileName.split('.')[0]
    entryPoints[name] = './js/' + fileName
  }

  return entryPoints
}

let entryPoints = generateEntryPoints()

module.exports = {
  entry: entryPoints,
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
