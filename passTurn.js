function passTurn(data, player, pawns) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == player) {
                data[i].players[j].pawns = pawns;
                data[i].players[j].takingTurn = false;
                if (j == data[i].players.length - 1) {
                    data[i].players[0].takingTurn = true;
                } else {
                    data[i].players[j + 1].takingTurn = true;
                }
            }
        }
    }
    // zbijanie prototype
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].players.length; j++) {
            if (data[i].players[j].name == player) {
                for (let k = 0; k < data[i].players.length; k++) { //gracze
                    if (data[i].players[k].color != data[i].players[j].color) {
                        for (let m = 0; m < 4; m++) { //pionki
                            if (data[i].players[k].pawns[m] == pawns[0] && data[i].players[k].pawns[m] != "start") {
                                console.log("chuj0")
                                data[i].players[k].pawns[m] = "start"
                            }
                            if (data[i].players[k].pawns[m] == pawns[1] && data[i].players[k].pawns[m] != "start") {
                                console.log("chuj1")
                                data[i].players[k].pawns[m] = "start"
                            }
                            if (data[i].players[k].pawns[m] == pawns[2] && data[i].players[k].pawns[m] != "start") {
                                console.log("chuj2")
                                data[i].players[k].pawns[m] = "start"
                            }
                            if (data[i].players[k].pawns[m] == pawns[3] && data[i].players[k].pawns[m] != "start") {
                                console.log("chuj3")
                                data[i].players[k].pawns[m] = "start"
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = passTurn;