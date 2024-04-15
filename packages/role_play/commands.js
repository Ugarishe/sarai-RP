mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('a', (player, count) => {
    player.armour = parseInt(count);
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

mp.events.addCommand('c', (player, fullText, clothingType, clothingId) => {
    // Проверяем, что игрок указал тип одежды и идентификатор
    if (!clothingType || !clothingId) {
        player.outputChatBox('Пожалуйста, укажите тип одежды и идентификатор.');
        return;
    }

    // Устанавливаем одежду игроку
    player.setClothes(parseInt(clothingType), parseInt(clothingId), 0, 0);

    // Оповещаем игрока об изменении одежды
    player.outputChatBox('Ваша одежда была изменена.');
});

mp.events.addCommand('esp', (player, fullText) => {
    player.call('drawRedRaycast');
});

mp.events.addCommand('s', (player, pedNAme) => {
    let staticPed = mp.peds.new(mp.joaat(pedNAme), player.position,
    {    
        dynamic: false, // still server-side but not sync'ed anymore
        frozen: true,
        invincible: true
    });
});

mp.events.addCommand('ped', (player, pedNAme) => {
    player.model = mp.joaat(pedNAme);
});

mp.events.addCommand('anim', (player) => {
    player.stopAnimation();
    // player.playAnimation(
    //     "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
    //     "high_center_up",
    //     1,
    //     49
    // );
    player.playScenario("WORLD_HUMAN_AA_COFFEE");
});

mp.events.addCommand('stopanim', (player) => {
    player.stopAnimation();
});

mp.events.addCommand('skin', (player, fullText, code, parameters) => {
    if (code !== undefined && code.trim() !== "" && parameters !== undefined && parameters.trim() !== "") {
        if (code === "bGender") {
            player.call('client:setSkinSetting', [code, (parameters === "true")]);
        } else {
            player.call('client:setSkinSetting', [code, parseInt(parameters)]);
        }
    }
});


mp.events.add("setskins", function (player, bGender, MotherBlend, FatherBlend, BlendShape, BlendSkin, HairColour, HairHighlight, Hair) {

    var NoseWidth = 0, NoseHeight = 0, NoseLength = 0, NoseBridge = 0, NoseTip = 0, NoseBridgeShift = 0;
    var BrowHeight = 0, BrowWidth = 0, CBoneHeight = 0, CBoneWidth = 0, CheekWidth = 0, Eyes = 0, Lips = 0;
    var JawWidth = 0, jawHeight = 0, ChinLength = 0, ChinPos = 0, ChinWidth = 0, ChinShape = 0, NeckWidth = 0;

    player.setCustomization(bGender, MotherBlend, FatherBlend, 0, 
    MotherBlend, FatherBlend, 0, BlendShape, BlendSkin, 0, 99, HairColour, HairHighlight,
        [
            NoseWidth, NoseHeight, NoseLength, NoseBridge, NoseTip, NoseBridgeShift, 
            BrowHeight, BrowWidth, CBoneHeight, CBoneWidth, CheekWidth, Eyes, Lips,
            JawWidth, jawHeight, ChinLength, ChinPos, ChinWidth, ChinShape, NeckWidth
        ]
    );
    player.setClothes(2, Hair, 0, 0);
});

mp.events.addCommand('god', (player, ifGod) => {
    player.call('client:god');
});