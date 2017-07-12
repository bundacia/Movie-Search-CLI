import 'sepia'
import {expect} from 'chai'
import {queryIMDB} from '../imdb'

describe('imdb.js', function () {
  it('can find nemo!', function (done) {
    queryIMDB('finding nemo', (err, results) => {
      expect(err).to.be.null
      expect(results).to.have.length.gt(1)
      expect(results[0]).to.match(/Finding Nemo \(2003\)/)
      done()
    })
  })

  it('returns an empty array when no results', function (done) {
    queryIMDB('aintnomovienamedthiscrazystring', (err, results) => {
      expect(err).to.be.null
      expect(results).to.deep.eq([])
      done()
    })
  })
})
