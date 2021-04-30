function init() {
    document.getElementById("0").style.backgroundColor = "#FFCCCB"
    document.getElementById("10").style.backgroundColor = "#FFFCBB"
    document.getElementById("20").style.backgroundColor = "#ADD8E6"
    document.getElementById("30").style.backgroundColor = "#90EE90"
    for (let i = 0; i < 4; i++) {
        let red = document.createElement("div")
        let yellow = document.createElement("div")
        let blue = document.createElement("div")
        let green = document.createElement("div")
        red.id = "red-pawn-" + i
        yellow.id = "yellow-pawn-" + i
        blue.id = "blue-pawn-" + i
        green.id = "green-pawn-" + i
        red.className = "red-pawn"
        yellow.className = "yellow-pawn"
        blue.className = "blue-pawn"
        green.className = "green-pawn"
        document.getElementById("red-start").appendChild(red)
        document.getElementById("yellow-start").appendChild(yellow)
        document.getElementById("blue-start").appendChild(blue)
        document.getElementById("green-start").appendChild(green)
        document.getElementById("red-home-" + i).style.backgroundColor = "#FFCCCB"
        document.getElementById("yellow-home-" + i).style.backgroundColor = "#FFFCBB"
        document.getElementById("blue-home-" + i).style.backgroundColor = "#ADD8E6"
        document.getElementById("green-home-" + i).style.backgroundColor = "#90EE90"
    }
}
export default init;