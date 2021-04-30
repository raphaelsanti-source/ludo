const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const app = express();
let PORT = process.env.PORT || 3000;

// custom modules
const asignPlayer = require('./asignPlayer');
const findRoom = require('./findRoom');
const removePlayer = require('./removePlayer');
const existingPlayer = require('./existingPlayer');
const switchReady = require('./switchReady');
const passTurn = require('./passTurn');

// debugging


// TUTAJ MAM WSZYSTKO O SERWERZE I GRACH PROWADZONYCH XDDDDDD
var gameData = [];

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "super tajne" }));
app.use('/js', express.static(path.join(__dirname, 'static/js')));
app.use('/css', express.static(path.join(__dirname, 'static/css')));
app.use('/img', express.static(path.join(__dirname, 'static/img')));

// login view
app.get('/', (req, res) => {
    if (req.session.nickname) {
        res.redirect('/game');
    } else {
        res.sendFile(path.join(__dirname + '/static/pages/login.html'));
    }
});

// game view
app.get('/game', (req, res) => {
    if (req.session.nickname) {
        res.sendFile(path.join(__dirname + '/static/pages/game.html'));
    } else {
        res.redirect('/');
    }
});

// roll 
app.post('/roll', (req, res) => {
    console.log(req.body.roll)
});

// informacje do rendera
app.post('/game', (req, res) => {
    res.json(findRoom(gameData, req.session.nickname))
});

// kończenie sesji
app.post('/leave', (req, res) => {
    if (req.body.leave) {
        removePlayer(gameData, req.session.nickname);
        req.session.destroy();
        res.json({ message: "kończenie połączenia" })
    }
});

// gotowość do gry
app.post('/ready', (req, res) => {
    switchReady(gameData, req.session.nickname, req.body.ready)
    res.sendStatus(200)
});

// register endpoint
app.post('/register', (req, res) => {
    console.log(`new player: ${req.body.name}`)
    if (existingPlayer(gameData, req.body.name)) {
        res.json({ message: "ten nick jest już zajęty" })
    } else {
        req.session.nickname = req.body.name;
        console.log(req.session.nickname)
        asignPlayer(gameData, req.body.name);
        console.log(gameData);
        res.json({ message: "zaraz będziesz w grze" })
    }
});

// whoami
app.post('/whoami', (req, res) => {
    res.json({ nickname: req.session.nickname })
});

// move
app.post('/move', (req, res) => {
    passTurn(gameData, req.session.nickname, req.body)
    /*
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData[i].players.length; j++) {
            console.log(gameData[i].players[j].name + ": " + gameData[i].players[j].takingTurn)
        }
    }
    */
    res.sendStatus(200);
});

// test endpoint
// app.post('/purge', (req, res) => {
//     gameData = []
//     req.session.destroy
//     res.json({ message: "purged" })
// });

app.listen(PORT, () => {
    console.log(`śmigamy na lokalnie: http://localhost:${PORT}`)
});