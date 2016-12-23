const assert = require('chai').assert;
const Drawer = require('../drawer')

describe('Drawer', () => {

  describe('Draw algorithm', () => {

    let game = new Drawer(groupSize=2, duration=0.1)

    after(() => delete game)

    it('must generate at least one group', () => {

      game.startGame()
      game.addPlayer('John Snow')
      game.endGame()
      assert.isAbove(game.groups.length, 0)

    })

    it('should callback groups ending', done => {

      game.on('end', (groups) => done())

      game.addPlayer('Mark')
      game.addPlayer('Jenny')
      game.addPlayer('Henric')
      game.addPlayer('Bronko')

      game.endGame()
    })

    xit('there should never be a group with just one player', (done) => {
      let game = new Drawer(groupSize=2, duration=0.1)
      game.startGame()
      game.addPlayer('Peter')
      game.addPlayer('Mark')
      game.addPlayer('Marry')
      game.endGame()
      
      assert.typeOf(game.groups, 'array', 'groups is an array')
      assert.isAbove(game.groups.length, 0)

      game.groups.forEach((group, index, done) => {
        // console.log(group)
        assert.notEqual(group.length, 1)
      })

    })

  })

})
