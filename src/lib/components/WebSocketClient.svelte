<script lang="ts">
    import { state } from '../state/state.svelte'; 
    import { onMount } from 'svelte';
    import { io, Socket } from 'socket.io-client';

    let socket: Socket;

    onMount(() => {
        console.log('Establishing websocket connection');
        socket = io('http://localhost:3000'); // Ensure this URL is correct

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