<script lang="ts">
    import { state } from '../state/state.svelte'; 
    import { onMount } from 'svelte';
    import { io, Socket } from 'socket.io-client';

    let socket: Socket;

    onMount(() => {
        console.log('Establishing websocket connection');
        // This allows importing environment variables prefixed with VITE at runtime on the client side
        const wsPort = import.meta.env.VITE_WS_PORT || 3001; // Fallback to 3001 if not set
        const wsHost = window.location.hostname; // Get the current hostname

        // Construct the WebSocket URL
        const wsUrl = `${window.location.protocol}//${wsHost}:${wsPort}`;
        console.log(`Attempting to establish websocket connection at ${wsUrl}`);

        socket = io(wsUrl); 

        socket.on('connect', () => {
            console.log('Socket.IO connection established');
        });

        socket.on('message', (message) => {
            message = JSON.parse(message); // Parse the JSON message
            console.log('Message from server:', message);
            updateState(message); // Call the update function
        });

        return () => {
            socket.disconnect();
        };
    });

    function updateState(message: any) {
        // Update the state with new games data
        state.update(currentState => ({
            ...currentState,
            ownedGames: message,
            loaded: true
        }));
        console.log(`Updated State:`, message);
    }

    function sendMessage(msg: any) {
        console.log("Somebody done sent me a message");
        socket.emit('message', msg);
    }
</script>

<slot {sendMessage}></slot>