const http = require('http')
const cheerio = require('cheerio')

function queryIMDB(search, cb) {
  http.get({
      hostname: 'www.imdb.com',
      port: 80,
      path: `/find?ref_=nv_sr_fn&q=${search}&s=all`,
      agent: false  // create a new agent just for this one request
  }, (res) => {
    var html = ''
    res.on('data', (chunk) => { html += chunk; });
    res.on('end', () => {
      const results = parseResultsPage(html)
      cb(null, results)
    })
  })
  .on('error', cb)
}

function parseResultsPage(html) {
  const $ = cheerio.load(html)
  const links = $('.result_text')
    .map((i, elm) => $(elm).text())
    .toArray()
  return links
}

function run() {
  const search = process.argv[2]
  queryIMDB(search, (err, results) => {
    if (err) throw err
    console.log(results.join('\n'))
  })
}

if (!module.parent) {
  run()
}
