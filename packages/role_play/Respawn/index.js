mp.events.add('playerDeath', (player) => {
    player.call('client:Respawn:showRespwnInterfase');
});
