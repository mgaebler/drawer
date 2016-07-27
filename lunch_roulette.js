
// Game begins'
module.exports = class LunchRoulette {
  // Start a join time window'
  constructor (groupSize=2, duration=60) {
    if(groupSize < 2) throw 'A group must have at least a size of 2.'
    this.duration = duration * 60 * 1000;
    this.players = new Set()
    this.groupSize = groupSize
    this.state = 'initialized'
    this.groups = []
  }

  getTimeLeft(){
    return Math.ceil((this.endTime - Date.now()) / 1000);
  }

  onTick () {
    console.log('Seconds to go:', this.getTimeLeft())
    if (this.endTime < Date.now()){
      this.endGame()
    }
  }

  tick() {
    // ticks every second
    this.tickEngine = setTimeout(this.tick.bind(this), 1000)
    this.onTick()
  }

  //'Now people can join in by writing lunch in'
  addPlayer(player){
    this.players.add(player)
  }

  startGame() {
    console.log('Game started')
    this.startTime = Date.now()
    this.endTime = this.startTime + this.duration
    this.tick()
    this.state = 'running'
  }

  abortGame() {
    clearTimeout(this.tickEngine)
  }

  //'Game ends'
  endGame() {
    //'stop ticking'
    clearTimeout(this.tickEngine)
    this.state = 'ended'
    console.log('Game ended')
    this.displayPartnerList()
  }

  // 'Partner list will be displayed'
  displayPartnerList () {
    var groupCount = 0
    var playerCount = 0

    this.players.forEach((player) => {
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

    })
  }
}
