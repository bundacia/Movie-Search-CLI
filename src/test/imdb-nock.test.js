import nock from 'nock'
import {expect} from 'chai'
import {queryIMDB, parseResultsPage} from '../imdb'

describe('queryIMDB tests with nock', function () {

  it('can find nemo!', function (done) {
    nock('http://www.imdb.com')
      .get('/find')
      .reply(200, `
        <div class='findSection'>
          <table class="findList">
            <tr> <td class="result_text">Rocky</td> </tr>
            <tr> <td class="result_text">Rocky II</td> </tr>
          </table>
        </div>
      `)

    queryIMDB('finding nemo', (err, results) => {
      expect(err).to.be.null
      expect(results).to.have.length.gt(1)
      expect(results[0]).to.match(/Finding Nemo \(2003\)/)
      done()
    })
  })

  it('returns an empty array when no results', function (done) {
    nock('http://www.imdb.com')
      .get('/find')
      .reply(200, '<div class="findNoResults">&nbsp;</div>')

    queryIMDB('aintnomovienamedthiscrazystring', (err, results) => {
      expect(err).to.be.null
      expect(results).to.deep.eq([])
      done()
    })
  })

  afterEach(function() {
    nock.restore()
  })
})
