mp.events.add('playerJoin', (player) => {
    player.name = player.socialClub;
    player.dimension = 100000 + player.id;
    player.position = new mp.Vector3(2740.06, 1508.26, 45.92);
    mp.events.call('server::db:LogRegStartController', player);
});