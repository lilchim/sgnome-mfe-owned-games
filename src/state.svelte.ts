interface OwnedGames {
    game_count: number;
    games: Game[];
}

interface Game {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    rtime_last_played: number;
    content_descriptorids: number[];
    playtime_disconnected: number;
}

export const state = $state({
    ownedGames: null
})