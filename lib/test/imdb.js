'use strict';

require('sepia');

var _chai = require('chai');

var _imdb = require('../imdb');

describe('imdb.js', function () {
  this.timeout(6000);

  it('can find nemo!', function (done) {
    (0, _imdb.queryIMDB)('nemo', function (err, results) {
      (0, _chai.expect)(err).to.be.null;
      (0, _chai.expect)(results.length).to.be.gt(0);
      done();
    });
  });
});