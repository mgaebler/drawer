EventEmitter = require('events').EventEmitter

/**
@class TimeBasedGame
@description A basic timebased game mechanism.
*/

module.exports = class TimeBasedGame extends EventEmitter {

  // declare constants
  static get STATE_UNINITIALIZED() { return 'uninitialized' }
  static get STATE_INITIALIZED() { return 'initialized' }
  static get STATE_RUNNING() { return 'running' }
  static get STATE_ENDED() { return 'ended' }

  // Start a join time window
  constructor (groupSize=2, duration=60) {
    super()
    this.state = TimeBasedGame.STATE_UNINITIALIZED
    if(groupSize < 2) throw 'A group must have at least a size of 2.'
    this.duration = duration * 60 * 1000;
    this.players = new Set()
    this.groupSize = groupSize
    this.groups = []

    this.on('tick', secondsLeft => {
      // talk every tenth second
      if(secondsLeft % 10 === 0){
        console.info('Seconds to go:', secondsLeft)
      }
      // let game end after a given time
      if (this.endTime < Date.now()){
        this.endGame()
      }
    })
    this.state = TimeBasedGame.STATE_INITIALIZED
  }

  set state(state) {
    this.emit('stateChange', state)
    this.currentState = state
  }

  get state() {
    return this.currentState
  }

  getTotalDuration(){
    return (this.endTime - this.startTime) / 1000
  }

  getTimeLeft(){
    let secondsLeft = Math.ceil((this.endTime - Date.now()) / 1000)
    let percentLeft = Math.ceil(100 / this.getTotalDuration() * secondsLeft)
    return {
      inSeconds: secondsLeft,
      inPercent: percentLeft
    };
  }

  tick() {
    // ticks every second
    this.tickEngine = setTimeout(this.tick.bind(this), 1000)
    // execute tick events
    this.emit('tick', this.getTimeLeft())
  }

  // player mechanics
  addPlayer(player){
    this.players.add(player)
    this.emit('addPlayer', player)
  }

  remPlayer(player){
    this.players.delete(player)
    this.emit('remPlayer', player)
  }

  getPlayers() {
    return this.players
  }

  startGame() {
    this.startTime = Date.now()
    this.endTime = this.startTime + this.duration
    this.tick()
    this.state = TimeBasedGame.STATE_RUNNING
    this.emit('start', this.startTime, this.endTime)
    // console.info('Game started')
  }

  abortGame() {
    clearTimeout(this.tickEngine)
    // console.info('Game aborted')
  }

  //'Game ends'
  endGame() {
    //'stop ticking'
    clearTimeout(this.tickEngine)
    this.state = TimeBasedGame.STATE_ENDED
    this.emit('end', this.startTime, this.endTime)
    // console.info('Game ended')
  }

}
