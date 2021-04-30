import init from '/js/init.js';
import render from '/js/render.js';
import roll from '/js/roll.js';
import findplayer from '/js/findplayer.js';

var rolled = 0;
var data;
var checked = false;
var whoami;
var player;
var moved = false;

fetch("/whoami", {
    method: "post"
})
    .then(
        function (u) { return u.json(); }
    ).then(
        function (json) {
            whoami = json.nickname;
        }
    )
init();
let ajaxInterval = setInterval(function () {
    fetch("/game", {
        method: "post"
    })
        .then(
            function (u) { return u.json(); }
        ).then(
            function (json) {
                data = json;
                player = findplayer(data, whoami);
                render(json);
            }
        )
}, 1000);
document.getElementById("readyToPlay").addEventListener("click", function () {
    checked = !checked;
    fetch("/ready", {
        method: "post",
        body: JSON.stringify({ ready: checked }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

});
document.getElementById("leaveBtn").addEventListener("click", function () {
    fetch("/leave", {
        method: "post",
        body: JSON.stringify({ leave: true }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(
            function (u) { return u.json(); }
        ).then(
            function (json) {
                if (alert(json.message)) { }
                else window.location.reload();
            }
        )
});

document.getElementById("dice").addEventListener("click", function () {
    if (player.takingTurn) {
        for (let i = 0; i < 4; i++) {
            document.getElementById(player.color + "-pawn-" + i).addEventListener("click", function () {
                if (rolled != 0) {
                    let cheat = false;
                    let pawnsPos = player.pawns;
                    let begining = 0;
                    for (let j = 0; j < 4; j++) {
                        if (player.pawns[j] == "start") {
                            begining++;
                        }
                    }
                    if (begining == 4) {
                        if (player.pawns[i] == "start" && (rolled == 1 || rolled == 6)) {
                            switch (player.color) {
                                case "red":
                                    pawnsPos[i] = 0;
                                    break
                                case "yellow":
                                    pawnsPos[i] = 10;
                                    break
                                case "blue":
                                    pawnsPos[i] = 20;
                                    break
                                case "green":
                                    pawnsPos[i] = 30;
                                    break
                            }
                        }
                    } else {
                        if (player.pawns[i] == "start" && (rolled == 1 || rolled == 6)) {
                            switch (player.color) {
                                case "red":
                                    pawnsPos[i] = 0;
                                    break
                                case "yellow":
                                    pawnsPos[i] = 10;
                                    break
                                case "blue":
                                    pawnsPos[i] = 20;
                                    break
                                case "green":
                                    pawnsPos[i] = 30;
                                    break
                            }
                        } else if (player.pawns[i] != "start") {
                            pawnsPos[i] += rolled;
                            if (pawnsPos[i] > 39) {
                                pawnsPos[i] = pawnsPos[i] - 40;
                            }
                        } else if (player.pawns[i] == "start" && (rolled != 1 || rolled != 6)) {
                            cheat = true;
                        }
                    }
                    console.log(pawnsPos);
                    if (!cheat) {
                        rolled = 0;
                        fetch('/move', {
                            method: "post",
                            body: JSON.stringify(pawnsPos),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    } else {
                        alert('Nie :DDDD')
                    }
                }
                switch (player.pawns[i] + rolled) {
                    case 0:
                        document.getElementById("0").style.backgroundColor = "#FFCCCB";
                        break
                    case 10:
                        document.getElementById("10").style.backgroundColor = "#FFFCBB";
                        break
                    case 20:
                        document.getElementById("20").style.backgroundColor = "#ADD8E6";
                        break
                    case 30:
                        document.getElementById("30").style.backgroundColor = "#90EE90";
                        break
                    default:
                        if (player.pawns[i] != "start") {
                            if (player.pawns[i] + rolled > 39) {
                                document.getElementById(player.pawns[i] + rolled - 40).style.backgroundColor = "lightslategrey";
                            } else {
                                // getbyid = null
                                document.getElementById(player.pawns[i] + rolled).style.backgroundColor = "lightslategrey";
                            }
                        }
                        break
                }
            });
            document.getElementById(player.color + "-pawn-" + i).addEventListener("mouseenter", function () {
                if (rolled != 0) {
                    if (player.pawns[i] == "start" && (rolled == 1 || rolled == 6)) {
                        switch (player.color) {
                            case "red":
                                document.getElementById("0").style.backgroundColor = "purple";
                                break
                            case "yellow":
                                document.getElementById("10").style.backgroundColor = "purple";
                                break
                            case "blue":
                                document.getElementById("20").style.backgroundColor = "purple";
                                break
                            case "green":
                                document.getElementById("30").style.backgroundColor = "purple";
                                break
                        }
                    }
                    if (player.pawns[i] != "start") {
                        if (player.pawns[i] + rolled > 39) {
                            document.getElementById(player.pawns[i] + rolled - 40).style.backgroundColor = "purple";
                        } else {
                            document.getElementById(player.pawns[i] + rolled).style.backgroundColor = "purple";
                        }
                    }
                    if (player.pawns[i] == "start" && (rolled == 1 || rolled == 6)) {
                        document.getElementById(player.color + "-pawn-" + i).style.cursor = "pointer";
                    }
                    if (player.pawns[i] != "start") {
                        document.getElementById(player.color + "-pawn-" + i).style.cursor = "pointer";
                    }
                }
            });
            document.getElementById(player.color + "-pawn-" + i).addEventListener("mouseleave", function () {
                if (rolled != 0) {
                    if (player.pawns[i] == "start" && (rolled == 1 || rolled == 6)) {
                        switch (player.color) {
                            case "red":
                                document.getElementById("0").style.backgroundColor = "lightslategrey";
                                break
                            case "yellow":
                                document.getElementById("10").style.backgroundColor = "lightslategrey";
                                break
                            case "blue":
                                document.getElementById("20").style.backgroundColor = "lightslategrey";
                                break
                            case "green":
                                document.getElementById("30").style.backgroundColor = "lightslategrey";
                                break
                        }
                    }
                    if (player.pawns[i] != "start") {
                        switch (player.pawns[i] + rolled) {
                            case 0:
                                document.getElementById("0").style.backgroundColor = "#FFCCCB";
                                break
                            case 10:
                                document.getElementById("10").style.backgroundColor = "#FFFCBB";
                                break
                            case 20:
                                document.getElementById("20").style.backgroundColor = "#ADD8E6";
                                break
                            case 30:
                                document.getElementById("30").style.backgroundColor = "#90EE90";
                                break
                            default:
                                if (player.pawns[i] + rolled > 39) {
                                    document.getElementById(player.pawns[i] + rolled - 40).style.backgroundColor = "lightslategrey";
                                } else {
                                    document.getElementById(player.pawns[i] + rolled).style.backgroundColor = "lightslategrey";
                                }
                                break
                        }
                    }
                }
            });
        }
    }
}, { once: true });

document.getElementById("dice").addEventListener("click", function () {
    if (player.takingTurn && rolled == 0) {
        let utterance;
        let min = Math.ceil(1);
        let max = Math.floor(6);
        let roll = Math.floor(Math.random() * (max - min + 1) + min);
        switch (roll) {
            case 1:
                utterance = new SpeechSynthesisUtterance("jeden");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice1.png)";
                break;
            case 2:
                utterance = new SpeechSynthesisUtterance("dwa");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice2.png)";
                break;
            case 3:
                utterance = new SpeechSynthesisUtterance("trzy");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice3.png)";
                break;
            case 4:
                utterance = new SpeechSynthesisUtterance("cztery");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice4.png)";
                break;
            case 5:
                utterance = new SpeechSynthesisUtterance("pięć");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice5.png)";
                break;
            case 6:
                utterance = new SpeechSynthesisUtterance("sześć");
                speechSynthesis.speak(utterance);
                document.getElementById("dice").style.backgroundImage = "url(/img/dice6.png)";
                break;
        }
        rolled = roll;
    }
}, { once: false });
//asdasdgit