<script>
    import { state } from '../state/state.svelte'; 
    import { Input } from "$lib/components/ui/input/index";
    const { ownedGames, loaded } = state;
</script>
<h1> Hello World</h1>

State:  {JSON.stringify(state, null, 2)}

{#if loaded}

    {#each ownedGames.games as game}

    {/each}

    {:else}
    <Input placeholder="Enter Steam Community Vanity ID"/>

{/if}

