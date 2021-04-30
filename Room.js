const uuid = require('uuid');
class Room {
    constructor() {
        this.id = uuid.v1();
        this.players = [];
        this.avalibleColors = ["red", "yellow", "blue", "green"];
        this.inProgress = false;
    }
    amountOfPlayers() {
        return this.players.length;
    }
    readyAmount() {
        let amount = 0;
        this.players.forEach((element) => {
            if (element.ready) {
                amount++;
            }
        })
        return amount;
    }
    startGame() {
        switch (this.amountOfPlayers()) {
            // TEST OPTION REMOVE BEFORE FINAL RELEASE
            case 1:
                if (this.readyAmount() == 1) {
                    this.inProgress = true
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].ready = true;
                    }
                    this.players[0].takingTurn = true;
                }
            case 2:
                if (this.readyAmount() == 2) {
                    this.inProgress = true
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].ready = true;
                    }
                    this.players[0].takingTurn = true;
                }
                break;
            case 3:
                if (this.readyAmount() == 2) {
                    this.inProgress = true
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].ready = true;
                    }
                    this.players[0].takingTurn = true;
                }
                break;
            case 4:
                if (this.readyAmount() == 3) {
                    this.inProgress = true
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].ready = true;
                    }
                    this.players[0].takingTurn = true;
                }
                break;
        }
    }
}
module.exports = Room;