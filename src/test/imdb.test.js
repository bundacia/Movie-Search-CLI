import replayer from 'replayer'
import {expect} from 'chai'
import {queryIMDB, parseResultsPage} from '../imdb'

describe('queryIMDB', function () {
  // Increase timeout when recording in case imdb.com is slow
  if (process.env.VCR_MODE === 'record') { this.timeout(10000) }

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
})
