import 'sepia'
import {expect} from 'chai'
import {queryIMDB} from '../imdb'

describe('imdb.js', function () {
  this.timeout(6000)

  it('can find nemo!', function (done) {
    queryIMDB('nemo', (err, results) => {
      expect(err).to.be.null
      expect(results.length).to.be.gt(0)
      done()
    })
  })
})
