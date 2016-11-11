EventEmitter = require('events').EventEmitter


module.exports = class Drawer extends EventEmitter {
  // Start a join time window
  constructor (groupSize=2, duration=60) {
    super()
    if(groupSize < 2) throw 'A group must have at least a size of 2.'
    this.duration = duration * 60 * 1000;
    this.players = new Set()
    this.groupSize = groupSize
    this.state = 'initialized'
    this.currentState
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

  addPlayer(player){
    this.players.add(player)
    this.emit('addPlayer', player)
  }

  remPlayer(player){
    this.players.delete(player)
    this.emit('remPlayer', player)
  }

  startGame() {
    console.info('Game started')
    this.startTime = Date.now()
    this.endTime = this.startTime + this.duration
    this.tick()
    this.state = 'running'
    this.emit('start', this.startTime, this.endTime)
  }

  abortGame() {
    clearTimeout(this.tickEngine)
    console.info('Game aborted')
  }

  //'Game ends'
  endGame() {
    //'stop ticking'
    clearTimeout(this.tickEngine)
    this.state = 'ended'
    console.info('Game ended')
    this.emit('end', this.startTime, this.endTime)
    this.generateGroups()
  }

  generateGroups(){
    var groupCount = 0
    var playerCount = 0

    // @todo this has to be more random
    for(let player of this.players){
      // pop players and group
      if(!this.groups[groupCount]) {
        this.groups[groupCount] = []
      }
      this.groups[groupCount].push(player)
      this.players.delete(player)

      playerCount += 1
      if(playerCount == this.groupSize){
        // reset player counter
        playerCount = 0
        groupCount += 1
      }
    }

    this.emit('draw', this.groups)
  }
}
