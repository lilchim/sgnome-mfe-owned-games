// src/socket.ts
import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message:) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all clients
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

export default io;