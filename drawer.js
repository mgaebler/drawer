
// Game begins'
module.exports = class Drawer {
  // Start a join time window'
  constructor (groupSize=2, duration=60) {
    if(groupSize < 2) throw 'A group must have at least a size of 2.'
    this.duration = duration * 60 * 1000;
    this.players = new Set()
    this.groupSize = groupSize
    this.state = 'initialized'
    this.groups = []

    this.drawEvents = []
    this.tickEvents = []
    this.startEvents = []
    this.endEvents = []
    this.addPlayerEvents = []
    this.remPlayerEvents = []

    this.onTick = (secondsLeft) => {
      // talk every tenth second
      if(secondsLeft % 10 === 0){
        console.log('Seconds to go:', secondsLeft)
      }

      // let the game end after a given time
      if (this.endTime < Date.now()){
        this.endGame()
      }
    }
  }

  getTimeLeft(){
    return Math.ceil((this.endTime - Date.now()) / 1000);
  }

  set onTick (callback) {
    this.tickEvents.push(callback)
  }

  set onStart (callback) {
    this.startEvents.push(callback)
  }

  set onEnd (callback) {
    this.endEvents.push(callback)
  }

  set onDraw (callback) {
    this.drawEvents.push(callback)
  }

  set onPlayerAdd (callback) {
    this.addPlayerEvents.push(callback)
  }

  set onPlayerRem (callback) {
    this.remPlayerEvents.push(callback)
  }



  tick() {
    // ticks every second
    this.tickEngine = setTimeout(this.tick.bind(this), 1000)
    // execute tick events
    this.tickEvents.forEach((e) => e(this.getTimeLeft()));
  }

  //'Now people can join in by writing lunch in'
  addPlayer(player){
    this.players.add(player)
    this.addPlayerEvents.forEach((e) => e())
  }

  remPlayer(player){
    this.players.delete(player)
    this.remPlayerEvents.forEach((e) => e())
  }

  startGame() {
    // console.log('Game started')
    this.startTime = Date.now()
    this.endTime = this.startTime + this.duration
    this.tick()
    this.state = 'running'
    this.startEvents.forEach(e => e(this.startTime, this.endTime))
  }

  abortGame() {
    clearTimeout(this.tickEngine)
  }

  //'Game ends'
  endGame() {
    //'stop ticking'
    clearTimeout(this.tickEngine)
    this.state = 'ended'
    // console.log('Game ended')
    this.endEvents.forEach(e => e(this.startTime, this.endTime))
    this.generateGroups()
  }

  generateGroups(){
    var groupCount = 0
    var playerCount = 0

    // @todo this has to be more random
    for(let player of this.players){
      // pop players and group them
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

    this.drawEvents.forEach((event) => event(this.groups))
  }
}
