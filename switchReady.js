function switchReady(data, name, state) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == name) {
                if (state) {
                    data[i].players[j].ready = true;
                } else {
                    data[i].players[j].ready = false;
                }
                data[i].startGame();
            }
        }
    }
}
module.exports = switchReady;