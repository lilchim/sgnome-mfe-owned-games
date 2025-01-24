import type { Handle } from '@sveltejs/kit';
import { Server as HttpServer } from 'http';
import io from './socket'; // Import the socket instance from src/socket.ts
import 'dotenv/config';

const httpServer = new HttpServer(); // Create an HTTP server

// Use the existing io instance to attach to the HTTP server
const origin = process.env.CORS_ORIGIN;
console.log(`Configured Origin: ${origin}`);
// const cors = {
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Allow your Svelte app's origin
//     methods: ["GET", "POST"],
// };

const cors = {
    origin: '*', // Allow your Svelte app's origin
    methods: ["GET", "POST"],
};
console.log(cors);
io.attach(httpServer, {
    cors
});

const wsport = process.env.VITE_WS_PORT ? Number(process.env.VITE_WS_PORT) : 3001;
// Start the HTTP server to listen for connections
httpServer.listen(wsport, () => {
    console.log(`Websocket Server is running on http://localhost:${wsport}`);
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