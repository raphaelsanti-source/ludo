function existingPlayer(data, name) {
    let exists = false;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == name) {
                exists = true;
            }
        }
    }
    return exists;
}
module.exports = existingPlayer;