<script lang="ts">
    import { state } from '../state/state.svelte'; 
    import { Input } from "$lib/components/ui/input/index";
    export let sendMessage: (msg: any) => void; // Receive sendMessage from parent

    let messageToSend = '';

    const command = (vanityurl: string) => ({
        command: 'SGNOME/vanityurl',
        payload: { vanityurl }

    })

    function handleSend() {
        let cmd = command(messageToSend);
        sendMessage(cmd); // Call the sendMessage function from $host
    }
</script>

{#if $state.loaded}
    {#each $state.ownedGames.games as game}
        <div>Game: {JSON.stringify(game)}</div>
    {/each}
{:else}
    <Input bind:value={messageToSend} placeholder="Enter Steam Community Vanity ID"/>
    <button on:click={handleSend}>Find Profile</button>
{/if}