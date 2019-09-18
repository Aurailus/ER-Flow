import * as express from "express";
import * as IO from "socket.io";
import {ERFlow} from "./ERFlow";

// Initialize WebServer

const port = 8000;

const app = express();
let http = require("http").Server(app);
let io: IO.Server = require("socket.io")(http);

// Create ERFlow Object

const flow = new ERFlow(io);

// Start Webserver and listen for connections.

let server = http.listen(port, () => {
	console.log(`Listening On ${port}.`)
});

io.on('connection', (client: IO.Socket) => {
	console.log(`${client.id} connected.`);
	flow.addSocket(client);
});
