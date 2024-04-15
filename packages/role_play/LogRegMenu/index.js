mp.events.add('playerJoin', (player) => {
    player.position = new mp.Vector3(2740.06, 1508.26, 45.92);
    player.call('client:showLogRegMenu');
});

mp.events.add('server:LogRegController', (player) => {
    player.call('client:closeLogRegMenuAndSpawn');
});