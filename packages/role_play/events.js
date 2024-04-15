// В модуле регестрации

// mp.events.add('playerJoin', (player) => {
//     player.name = player.socialClub;
//     mp.events.call('spawnInPosition', player);
//     player.call('client:GMenu:startInterfase');

// });

mp.events.add("spawnInPosition", (player) => {
    player.call('moveSkyCamera', [player, 'up', 1, false]);

    player.position = new mp.Vector3(2693.84, 1664.51, 24.63);
    player.health = 100;
    setTimeout(() => {
        player.call('moveSkyCamera', [player, 'down']);
        setTimeout(() => {
            player.dimension = 0;
        }, 5000);
    }, 5000);
});

mp.events.add("delateVehicle", function (player, vehicleData) {
    if(vehicleData){
        if(vehicleData.getOccupants().length === 0){
            player.outputChatBox(`Машина удалена.`);
            vehicleData.destroy();
        }
        else{
            player.outputChatBox(`В машине люди.`);
        }
    }
    else{
        player.outputChatBox('Машины уже нет.');
    }

  });

mp.events.add("playerChat", (player, message) => {
    mp.players.broadcast(`${player.name}: ${message}`);
});