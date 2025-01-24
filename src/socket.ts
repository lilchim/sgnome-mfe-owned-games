import { Server } from 'socket.io';
import { redisPub, redisSub } from './redisClient'; // Import the Redis client

// Create a new Socket.IO server with CORS enabled. Will need to configure this with env
const io = new Server({
    cors: {
        origin: "http://localhost:5173", // Allow your Svelte app's origin
        methods: ["GET", "POST"],
    },
});


io.on('connection', (socket) => {
    console.log('New client connected');

    // Subscribe to a Redis channel
    redisSub.subscribe('SGNOME/Steam/OwnedGames', (err, count) => {
        if (err) {
            console.error('Failed to subscribe: %s', err.message);
        } else {
            console.log(`Subscribed to ${count} channel(s).`);
        }
    });

    // Listen for messages from Redis
    redisSub.on('message', (channel, message) => {
        console.log(`Received message from Redis on channel ${channel}: ${message}`);
        // This can be changed to send to a single client if redis knows the client ID that the request originated from
        socket.emit('message', message); // Send the message to the connected client
    });

    socket.on('message', (msg) => {
        console.log('Websocket Server received message');
        console.dir(msg);
        let { command, payload } = msg;
        redisPub.publish(command, JSON.stringify(payload))
    })

    socket.on('disconnect', () => {
        console.log('Websocket Client disconnected');
    });
});

// Function to send a message to all connected clients
export const sendMessageToAll = (message: string) => {
    io.emit('message', message); // Emit a message to all connected clients
};

// Function to send a message to a specific client by socket ID
export const sendMessageToClient = (socketId: string, message: string) => {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
        socket.emit('message', message); // Send a message to a specific client
    } else {
        console.log(`Socket ID ${socketId} not found.`);
    }
};

export default io;