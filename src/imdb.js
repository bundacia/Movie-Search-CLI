import http from 'http'
import {stringify} from 'querystring'
import cheerio from 'cheerio'

export function queryIMDB(search, cb) {
  const querystring = stringify({
    "ref_": "nv_sr_fn",
    q: search,
    s: "all",
  })
  http.get({
    hostname: 'www.imdb.com',
    path: `/find?${querystring}`,
  }, res => {
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
  const links = $('.findSection')
    .first()
    .find('.result_text')
    .map((i, elm) => $(elm).text())
    .toArray()
  return links
}

function run() {
  const search = process.argv.slice(2).join(' ')
  queryIMDB(search, (err, results) => {
    if (err) throw err
    console.log(results.join('\n'))
  })
}

if (!module.parent) {
  run()
}
