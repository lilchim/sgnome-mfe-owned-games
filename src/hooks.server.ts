import type { Handle } from '@sveltejs/kit';
import { Server as HttpServer } from 'http';
import io from './socket'; // Import the socket instance from src/socket.ts

const httpServer = new HttpServer(); // Create an HTTP server

// Use the existing io instance to attach to the HTTP server
io.attach(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Allow your Svelte app's origin
        methods: ["GET", "POST"],
    },
});

// Start the HTTP server to listen for connections
httpServer.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Handle WebSocket upgrade requests
export const handle: Handle = async ({ event, resolve }) => {
    const { request } = event;

    if (request.headers.get('upgrade') === 'websocket') {
        // Return a Response indicating the upgrade
        return new Response(null, { status: 101 }); // 101 Switching Protocols
    }

    // Normal request handling
    return await resolve(event);
};