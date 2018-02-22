const fs = require("fs");
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const path = './src/handlers/pos_sys_router';
const gameHandlerPath = "./src/handlers/handlers.js";

const servePosSysRoute = require(path).servePosSysRoute;
const hostOrJoin = require("./src/handlers/host_or_join").hostOrJoin;
const handlers = require(gameHandlerPath);
const generateSessionId = require('./src/utils/time.js').generateSessionId;
const logRequest = require('./src/utils/logRequest').logRequest;

let app = express();
app.fs = fs;
app.generateSessionId = generateSessionId;

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logRequest);

app.get('/arePlayersReady',handlers.arePlayersReady);
app.get('/hasOpponentJoined',handlers.hasOpponentJoined);
app.get('/create-game',handlers.createGame);
app.get('/cancel-game',handlers.cancelGame);
app.get('/positionSystem',servePosSysRoute);
app.get('/host_or_join',hostOrJoin);

app.post('/isHit',handlers.isHit);
app.post('/start-game',handlers.loadFleet);
app.post('/login',handlers.createGame);

app.use(express.static('public'));

module.exports = app;
