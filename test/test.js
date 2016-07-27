const assert = require('chai').assert;
const LunchRoulette = require('../lunch_roulette')

describe('Lunch Roulette', () => {


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

    it('should be declared running after start', () => {
      lr.startGame()
      assert.equal(lr.state, 'running')
    })

    it('should be declared ended after stop', () => {
      lr.endGame()
      assert.equal(lr.state, 'ended')
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

    it('there should never be a group with just one player', (done) => {
      let lr = new LunchRoulette(groupSize=2, duration=0.1)
      lr.startGame()
      lr.addPlayer('Peter')
      lr.addPlayer('Mark')
      lr.addPlayer('Marry')
      lr.endGame()
      assert.typeOf(lr.groups, 'array', 'groups is an array')
      assert.isAbove(lr.groups.length, 0)

      lr.groups.forEach((group, index)=> {
        console.log(group)
        assert.notEqual(group.length, 1)
        if(lr.groups.length == index+1){
          done()
        }
      })

    })
  })

})
