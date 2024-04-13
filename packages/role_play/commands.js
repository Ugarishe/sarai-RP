mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

const colorMap = {
    "white": [234, 234, 234],
    "black": [13, 17, 22],
    "red": [182, 15, 37],
    "blue": [37, 58, 167],
    "green": [21, 92, 45],
    // Добавьте другие цвета по вашему усмотрению
};

mp.events.addCommand("v", (player, fullText, vName, number, color) => { // /spawnVehicle 0x6290F15B
    if (vName) {
        player.outputChatBox(`Usage: /v ${vName}, ${number}, ${color}`);    
    }
    const vehicle = mp.vehicles.new(mp.joaat(vName), new mp.Vector3(-461.884521484375, 6009.5087890625, 30.962833404541016), {
        numberPlate: number || 'admin',
        heading: 1,
        locked: false,
        engine: true,
        dimension: 0,
        alpha: 259,
        color: [colorMap[color],[[0, 0, 0]]],
        strong: true // Предотвратить переворот машины
    });
    if (vehicle) {
        vehicle.spawn(player.position, player.heading);
        player.putIntoVehicle(vehicle, 0);
    }
});

mp.events.addCommand('d', (player) => {
    const vehicle = player.vehicle
    if (vehicle && vehicle.occupants.length === 0) {
        vehicle.destroy(); // Удаляем машину
        player.outputChatBox('Машина удалена.'); // Выводим сообщение об удалении машины
    } else {
        player.outputChatBox('Машина не найдена.'); // Выводим сообщение, если машина не найдена
    }
});

mp.events.addCommand("w", (player, fullText, weapon, ammo) => {
	var weaponHash = mp.joaat(weapon);

	player.giveWeapon(weaponHash, parseInt(ammo) || 10000);

});