const Room = require('./Room');
const Player = require('./Player');
function asignPlayer(data, name) {
    if (data.length == 0) {
        data.push(new Room());
        data[0].players.push(new Player(name, data[0].avalibleColors[0]));
        data[0].avalibleColors.shift();
    } else if (data[data.length - 1].inProgress) {
        data.push(new Room());
        data[data.length - 1].players.push(new Player(name, data[data.length - 1].avalibleColors[0]));
        data[data.length - 1].avalibleColors.shift();
    } else {
        if (data[data.length - 1].amountOfPlayers() == 4) {
            data.push(new Room());
            data[data.length - 1].players.push(new Player(name, data[data.length - 1].avalibleColors[0]));
            data[data.length - 1].avalibleColors.shift();
        } else {
            data[data.length - 1].players.push(new Player(name, data[data.length - 1].avalibleColors[0]));
            data[data.length - 1].avalibleColors.shift();
        }
    }
}
module.exports = asignPlayer;