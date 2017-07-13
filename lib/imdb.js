'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryIMDB = queryIMDB;
exports.parseResultsPage = parseResultsPage;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _querystring = require('querystring');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queryIMDB(search, cb) {
  var querystring = (0, _querystring.stringify)({
    "ref_": "nv_sr_fn",
    q: search,
    s: "all"
  });
  _http2.default.get({
    hostname: 'www.imdb.com',
    path: '/find?' + querystring
  }, function (res) {
    var html = '';
    res.on('data', function (chunk) {
      html += chunk;
    });
    res.on('end', function () {
      var results = parseResultsPage(html);
      cb(null, results);
    });
  }).on('error', cb);
}

function parseResultsPage(html) {
  var $ = _cheerio2.default.load(html);
  var links = $('.findSection').first().find('.result_text').map(function (i, elm) {
    return $(elm).text();
  }).toArray();
  return links;
}

function run() {
  var search = process.argv.slice(2).join(' ');
  queryIMDB(search, function (err, results) {
    if (err) throw err;
    console.log(results.join('\n'));
  });
}

if (!module.parent) {
  run();
}