const assert = require('chai').assert;
const Drawer = require('../drawer')

describe('Drawer', () => {

  describe('Check game mechanics', () => {

    dr = new Drawer(groupSize=3, duration=0.1)

    after(() => delete dr)

    it('should show the correct number of players', () => {
      dr.addPlayer('Mark')
      dr.addPlayer('Jenny')
      dr.addPlayer('Henric')
      dr.addPlayer('Bronko')
      
      assert.equal(dr.players.size, 4)
    })

    it('should remove duplicates', () => {
      dr.addPlayer('Mark')
      dr.addPlayer('Jenny')

      assert.equal(dr.players.size, 4)
    })

    it('should be declared running after start', () => {
      dr.startGame()
      assert.equal(dr.state, 'running')
    })

    it('should be declared ended after stop', () => {
      dr.endGame()
      assert.equal(dr.state, 'ended')
    })

  })

  describe('Check events', () => {
    var dr;

    beforeEach(() => dr = new Drawer(groupSize=2, duration=0.1))
    afterEach(() => delete(dr))

    it('should callback when game starts', done => {
      dr.onStart = () => done()
      dr.startGame()
      dr.endGame()
    })

    it('should callback when game ends', done => {
      dr.onEnd = () => done()
      dr.startGame()
      dr.endGame()
    })

    it('should callback groups after draw', done => {

      dr.onDraw = (groups) => done()

      dr.addPlayer('Mark')
      dr.addPlayer('Jenny')
      dr.addPlayer('Henric')
      dr.addPlayer('Bronko')

      dr.endGame()
    })

    it('should callback after adding a player', done => {

      dr.onPlayerAdd = () => done()
      dr.addPlayer('Mark')
      dr.endGame()

    })

    it('should callback after removing a player', done => {

      dr.onPlayerRem = () => done()
      dr.addPlayer('Mark')
      dr.remPlayer('Mark')
      dr.endGame()

    })

  })

  describe('draw algorithm', () => {
    it('must generate at least one group', () => {
      let dr = new Drawer(groupSize=2, duration=0.1)
      dr.startGame()
      dr.addPlayer('John Snow')
      dr.endGame()
      assert.isAbove(dr.groups.length, 0)

    })

    xit('there should never be a group with just one player', (done) => {
      let dr = new Drawer(groupSize=2, duration=0.1)
      dr.startGame()
      dr.addPlayer('Peter')
      dr.addPlayer('Mark')
      dr.addPlayer('Marry')
      dr.endGame()
      assert.typeOf(dr.groups, 'array', 'groups is an array')
      assert.isAbove(dr.groups.length, 0)

      dr.groups.forEach((group, index, done) => {
        // console.log(group)
        assert.notEqual(group.length, 1)
      })

    })
  })

})
