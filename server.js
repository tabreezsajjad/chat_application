const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("A new client connected");
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Broadcast the message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', function close() {
        console.log("Client Disconnected");
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
