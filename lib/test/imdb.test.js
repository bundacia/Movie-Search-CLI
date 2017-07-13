'use strict';

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _chai = require('chai');

var _imdb = require('../imdb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('queryIMDB', function () {

  it('can find nemo!', function (done) {
    (0, _nock2.default)('http://www.imdb.com').get('/find').query(true).reply(200, '\n        <div class=\'findSection\'>\n          <table class="findList">\n            <tr> <td class="result_text">Rocky</td> </tr>\n            <tr> <td class="result_text">Rocky II</td> </tr>\n          </table>\n        </div>\n      ');

    (0, _imdb.queryIMDB)('finding nemo', function (err, results) {
      (0, _chai.expect)(err).to.be.null;
      (0, _chai.expect)(results).to.deep.eq(['Rocky', 'Rocky II']);
      done();
    });
  });

  it('returns an empty array when no results', function (done) {
    (0, _nock2.default)('http://www.imdb.com').get('/find').query(true).reply(200, '<div class="findNoResults">&nbsp;</div>');

    (0, _imdb.queryIMDB)('aintnomovienamedthiscrazystring', function (err, results) {
      (0, _chai.expect)(err).to.be.null;
      (0, _chai.expect)(results).to.deep.eq([]);
      done();
    });
  });

  afterEach(function () {
    _nock2.default.restore();
  });
});

describe('parseResultsPage', function () {
  it('parses the results page', function (done) {
    var resultsHTML = '\n    <div class=\'findSection\'>\n      <table class="findList">\n        <tr> <td class="result_text">Rocky</td> </tr>\n        <tr> <td class="result_text">Rocky II</td> </tr>\n      </table>\n    </div>\n    ';
    var movieList = (0, _imdb.parseResultsPage)(resultsHTML);

    (0, _chai.expect)(movieList).to.deep.eq(['Rocky', 'Rocky II']);
    done();
  });
});