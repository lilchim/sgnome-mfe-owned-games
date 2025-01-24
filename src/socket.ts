import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: "http://localhost:5173", // Allow your Svelte app's origin
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all clients
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
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