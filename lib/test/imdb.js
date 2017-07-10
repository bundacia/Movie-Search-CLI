require('sepia');
const expect = require('chai').expect;

const queryIMDB = require('../imdb').queryIMDB;

describe('imdb.js', function () {
  this.timeout(6000);

  it('can find nemo!', function (done) {
    queryIMDB('nemo', (err, results) => {
      expect(err).to.be.null;
      expect(results.length).to.be.gt(0);
      done();
    });
  });
});