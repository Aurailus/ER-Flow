"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ERFlow_1 = require("./ERFlow");
// Initialize WebServer
const port = 8000;
const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
// Create ERFlow Object
const flow = new ERFlow_1.ERFlow();
// Start Webserver and listen for connections.
let server = http.listen(port, () => {
    console.log(`Listening On ${port}.`);
});
io.on('connection', (client) => {
    console.log(`${client.id} connected.`);
    flow.replaceSocket(client);
});
//# sourceMappingURL=Main.js.map