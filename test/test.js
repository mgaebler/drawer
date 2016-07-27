const assert = require('chai').assert;
const LunchRoulette = require('../lunch_roulette')

describe('Lunch Roulette', () => {

  describe('Check game mechanics', () => {

    lr = new LunchRoulette(groupSize=3, duration=0.1)

    after(() => delete lr)

    it('should show the correct number of players', () => {
      lr.addPlayer('Mark')
      lr.addPlayer('Jenny')
      lr.addPlayer('Henric')
      lr.addPlayer('Bronko')
      // count 3 players
      assert.equal(lr.players.size, 4)
    })

    it('should remove duplicates', () => {
      lr.addPlayer('Mark')
      lr.addPlayer('Jenny')

      assert.equal(lr.players.size, 4)
    })

    it('should be declared running after start', () => {
      lr.startGame()
      assert.equal(lr.state, 'running')
    })

    it('should be declared ended after stop', () => {
      lr.endGame()
      assert.equal(lr.state, 'ended')
    })

  })

  describe('callbacks', () => {
    it('should callback groups after ending', done => {
      lr = new LunchRoulette(groupSize=2, duration=0.1)
      lr.onGroupsReady = (groups) => done()

      lr.addPlayer('Mark')
      lr.addPlayer('Jenny')
      lr.addPlayer('Henric')
      lr.addPlayer('Bronko')

      lr.endGame()
      
    })
  })

  describe('draw algorithm', () => {
    it('must generate at least one group', () => {
      let lr = new LunchRoulette(groupSize=2, duration=0.1)
      lr.startGame()
      lr.addPlayer('John Snow')
      lr.endGame()
      assert.isAbove(lr.groups.length, 0)

    })

    xit('there should never be a group with just one player', (done) => {
      let lr = new LunchRoulette(groupSize=2, duration=0.1)
      lr.startGame()
      lr.addPlayer('Peter')
      lr.addPlayer('Mark')
      lr.addPlayer('Marry')
      lr.endGame()
      assert.typeOf(lr.groups, 'array', 'groups is an array')
      assert.isAbove(lr.groups.length, 0)

      lr.groups.forEach((group, index, done) => {
        // console.log(group)
        assert.notEqual(group.length, 1)
      })

    })
  })

})
