function findRoom(data, name) {
    let lfRoom = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == name) {
                lfRoom = data[i];
            }
        }
    }
    return lfRoom;
}
module.exports = findRoom;