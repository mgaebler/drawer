const TimeBasedGame = require('./time-based-game')

module.exports = class Drawer extends TimeBasedGame {
  constructor() {
    super()
    this.on('end', () => this.generateGroups() )
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
