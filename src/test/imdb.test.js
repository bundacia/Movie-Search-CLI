import nock from 'nock'
import {expect} from 'chai'
import {queryIMDB, parseResultsPage} from '../imdb'

describe('queryIMDB', function () {

  it('can find nemo!', function (done) {
    nock('http://www.imdb.com')
      .get('/find')
      .query(true)
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
      expect(results).to.deep.eq([
        'Rocky',
        'Rocky II',
      ])
      done()
    })
  })

  it('returns an empty array when no results', function (done) {
    nock('http://www.imdb.com')
      .get('/find')
      .query(true)
      .reply(200, '<div class="findNoResults">&nbsp;</div>')

    queryIMDB('aintnomovienamedthiscrazystring', (err, results) => {
      expect(err).to.be.null
      expect(results).to.deep.eq([])
      done()
    })
  })

  afterEach(function() {
    nock.cleanAll()
  })
})

describe('parseResultsPage', function () {
  it('parses the results page', function (done) {
    const resultsHTML = `
    <div class='findSection'>
      <table class="findList">
        <tr> <td class="result_text">Rocky</td> </tr>
        <tr> <td class="result_text">Rocky II</td> </tr>
      </table>
    </div>
    `
    const movieList = parseResultsPage(resultsHTML)

    expect(movieList).to.deep.eq([
      'Rocky',
      'Rocky II',
    ])
    done()
  })

  afterEach(function() {
    nock.cleanAll()
  })
})
