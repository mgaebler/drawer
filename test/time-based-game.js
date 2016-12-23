const assert = require('chai').assert;
const TimeBasedGame = require('../time-based-game')

describe('TimeBasedGame', () => {

  describe('Game mechanics', () => {

    let game = new TimeBasedGame(groupSize=3, duration=0.1)

    after(() => delete game)

    it('should show the correct number of players', () => {
      game.addPlayer('Mark')
      game.addPlayer('Jenny')
      game.addPlayer('Henric')
      game.addPlayer('Bronko')

      assert.equal(game.players.size, 4)
    })

    it('should remove duplicates', () => {
      game.addPlayer('Mark')
      game.addPlayer('Jenny')

      assert.equal(game.players.size, 4)
    })

    it('should be declared running after start', () => {
      game.startGame()
      assert.equal(game.state, 'running')
    })

    it('should be declared ended after stop', () => {
      game.endGame()
      assert.equal(game.state, 'ended')
    })

  })

  describe('Check events', () => {
    var game;

    beforeEach(() => game = new TimeBasedGame(groupSize=2, duration=0.1))
    afterEach(() => delete(game))

    it('should callback when game starts', done => {
      game.on('start', ()=> done())
      game.startGame()
      game.endGame()
    })

    it('should callback when game ends', done => {
      game.on('end', () => done())
      game.startGame()
      game.endGame()
    })

    it('should callback after adding a player', done => {

      game.on('addPlayer', () => done())
      game.addPlayer('Mark')
      game.endGame()

    })

    it('should callback after removing a player', done => {

      game.on('remPlayer', () => done())
      game.addPlayer('Mark')
      game.remPlayer('Mark')
      game.endGame()

    })

  })

})
