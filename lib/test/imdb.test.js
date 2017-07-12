'use strict';

var _replayer = require('replayer');

var _replayer2 = _interopRequireDefault(_replayer);

var _chai = require('chai');

var _imdb = require('../imdb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('queryIMDB', function () {
  // Increase timeout when recording in case imdb.com is slow
  if (process.env.VCR_MODE === 'record') {
    this.timeout(10000);
  }

  it('can find nemo!', function (done) {
    (0, _imdb.queryIMDB)('finding nemo', function (err, results) {
      (0, _chai.expect)(err).to.be.null;
      (0, _chai.expect)(results).to.have.length.gt(1);
      (0, _chai.expect)(results[0]).to.match(/Finding Nemo \(2003\)/);
      done();
    });
  });

  it('returns an empty array when no results', function (done) {
    (0, _imdb.queryIMDB)('aintnomovienamedthiscrazystring', function (err, results) {
      (0, _chai.expect)(err).to.be.null;
      (0, _chai.expect)(results).to.deep.eq([]);
      done();
    });
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