'use strict';

require('sepia');
var expect = require('chai').expect;

var queryIMDB = require('../imdb').queryIMDB;

describe('imdb.js', function () {
  this.timeout(6000);

  it('can find nemo!', function (done) {
    queryIMDB('nemo', function (err, results) {
      expect(err).to.be.null;
      expect(results.length).to.be.gt(0);
      done();
    });
  });
});