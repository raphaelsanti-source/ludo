class Player {
    constructor(name, color) {
        this.name = name;
        this.ready = false;
        this.takingTurn = false;
        this.color = color;
        this.pawns = ["start", "start", "start", "start"];
    }
}
module.exports = Player;