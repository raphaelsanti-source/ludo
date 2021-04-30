function removePlayer(data, name) {
    let deletedColor, x, y;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == name) {
                x = i;
                y = j;
            }
        }
        deletedColor = data[x].players[y].color
        data[x].players.splice(y, 1);
        if (data[x].players.length == 0) {
            data.splice(x, 1);
        } else {
            data[x].avalibleColors.push(deletedColor)
        }
    }
}
module.exports = removePlayer;