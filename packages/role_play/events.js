mp.events.add('playerDeath', (player) => {
    spawnInPosition(player, new mp.Vector3(2693.84, 1664.51, 24.63))
});

mp.events.add('playerJoin', (player) => {
    player.name = player.socialClub;
    spawnInPosition(player, new mp.Vector3(2693.84, 1664.51, 24.63))
    player.call('client:GMenu:startInterfase');

});

function spawnInPosition(player, positionFrom){

    player.call('moveSkyCamera', [player, 'up', 1, false]);

    // After 5 seconds, camera start to go back to player.
    setTimeout(() => {
        player.spawn(positionFrom);
        player.call('moveSkyCamera', [player, 'down']);
    }, 5000);

    player.health = 100;
}

mp.events.add("delateVehicle", function (player, vehicleData) {
    if(vehicleData){
        player.outputChatBox('Машина удалена.');
        vehicleData.destroy();
    }else{
        player.outputChatBox('Машины уже нет.');
    }

  });