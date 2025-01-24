<script lang="ts">
    import { state } from '../state/state.svelte'; 
    import { Input } from "$lib/components/ui/input/index";
    const { ownedGames, loaded } = state;

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
            console.log('Message from server:', message);
        });

        return () => {
            socket.disconnect();
        };
    });


    function sendMessage() {
        socket.emit('message', 'Hello, Server!');
    }
</script>

<button on:click={sendMessage}>Send Message</button>

<h1> Hello World</h1>

State:  {JSON.stringify(state, null, 2)}

{#if loaded}

    {#each ownedGames.games as game}
        Game
    {/each}

    {:else}
    <Input placeholder="Enter Steam Community Vanity ID"/>

{/if}

