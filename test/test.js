const assert = require('chai').assert;
const LunchRoulette = require('../lunch_roulette')

describe('Check game mechanics', () => {

  lr = new LunchRoulette(groupSize=4, duration=1)

  after(() => delete lr)

  it('should show the correct number of players', () => {
    lr.addPlayer('Mark')
    lr.addPlayer('Jenny')
    lr.addPlayer('Henric')
    // count 3 players
    assert.equal(lr.players.size, 3)
  })

  it('should remove duplicates', () => {
    lr.addPlayer('Mark')
    lr.addPlayer('Jenny')

    assert.equal(lr.players.size, 3)
  })

  it('should never be just one player left')

  it('should be declared running after start', () => {
    lr.startGame()
    assert.equal(lr.state, 'running')
  })

  it('should be declared ended after stop', () => {
    lr.endGame()
    assert.equal(lr.state, 'ended')
  })

})
