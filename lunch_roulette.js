
// Game begins'
module.exports = class LunchRoulette {
  // Start a join time window'
  constructor (groupSize=2, duration=60) {
    this.startTime = Date.now()
    this.duration = duration * 60 * 1000;
    this.endTime = this.startTime + this.duration
    this.players = new Set()
    this.groupSize = groupSize
    this.state = 'initialized'
  }

  onTick () {
    if (this.endTime < Date.now()){
      this.endGame()
    }
  }

  tick() {
    // tick every second
    this.tickEngine = setTimeout(this.tick, 1000)
    console.log('tick!')
    this.onTick()
  }

  //'Now people can join in by writing lunch in'
  addPlayer(player){
    this.players.add(player)
  }

  startGame() {
    this.state = 'running'
    console.log('Game started')
  }

  abortGame() {
    clearTimeout(this.tickEngine)
  }

  //'Game ends'
  endGame() {
    //'stop ticking'
    clearTimeout(this.tickEngine)
    this.state = 'ended'
    this.displayPartnerList()
    console.log('Game ended')
  }

  // 'Partner list will be displayed'
  displayPartnerList () {
    this.players
    this.groupSize
    // @todo write a Partner algorithm
  }
}
