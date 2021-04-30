function findplayer(data, player) {
    let playerObj;
    for (let i = 0; i < data.players.length; i++) {
        if (data.players[i].name == player) {
            playerObj = data.players[i];
        }
    }
    return playerObj;
}
export default findplayer;