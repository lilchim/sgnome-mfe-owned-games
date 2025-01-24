<script lang="ts">
    import WebSocketClient from '$lib/components/WebSocketClient.svelte';
    import OwnedGames from '$lib/components/OwnedGames.svelte';
</script>

<WebSocketClient let:sendMessage>
    <OwnedGames {sendMessage} />
</WebSocketClient>