function render(data) {
    for (let i = 0; i < data.players.length; i++) {
        document.getElementById("player-" + i).innerHTML = "<h5>" + data.players[i].name + "</h5>";
        if (data.inProgress && document.getElementById("readyBtn") != null) {
            document.getElementById("readyBtn").parentNode.removeChild(document.getElementById("readyBtn"))
            document.getElementById("dice").style.cursor = "pointer";
        }
        if (data.players[i].takingTurn) {
            document.getElementById("currentPlayerTurn").innerText = data.players[i].name;
        }
        if (data.players[i].ready) {
            switch (data.players[i].color) {
                case "red":
                    document.getElementById("player-" + i).style.backgroundColor = "red";
                    document.getElementById("player-" + i).style.color = "black";
                    break
                case "yellow":
                    document.getElementById("player-" + i).style.backgroundColor = "yellow";
                    document.getElementById("player-" + i).style.color = "black";
                    break
                case "blue":
                    document.getElementById("player-" + i).style.backgroundColor = "blue";
                    document.getElementById("player-" + i).style.color = "black";
                    break
                case "green":
                    document.getElementById("player-" + i).style.backgroundColor = "green";
                    document.getElementById("player-" + i).style.color = "black";
                    break
            }
        } else {
            document.getElementById("player-" + i).style.backgroundColor = "lightslategrey"
            document.getElementById("player-" + i).style.color = "black";
        }
        for (let j = 0; j < 4; j++) {
            let pawn = document.getElementById(data.players[i].color + "-pawn-" + j)
            if (data.players[i].pawns[j] != "start") {
                pawn.parentElement.removeChild(pawn);
                document.getElementById(data.players[i].pawns[j]).appendChild(pawn);
            } else {
                pawn.parentElement.removeChild(pawn);
                document.getElementById(data.players[i].color + "-start").appendChild(pawn);
            }
        }
    }
}
export default render;