require('./noclip');

require('./MoveSkyCamera');

require('./GMenu');

mp.events.add('getPlayerLookingVehicle', () => {
    var player = mp.players.local;
	const camera = mp.cameras.new("gameplay"); // получаем текущую камеру геймплея

    let position = camera.getCoord(); // получаем позицию камеры как Vector3

    let direction = camera.getDirection(); // получаем вектор направления взгляда камеры как Vector3

    let farAway = new mp.Vector3(
        position.x + direction.x,
        position.y + direction.y,
        position.z + direction.z
    ); // вычисляем точку, в которую смотрит камера

    const hitData = mp.raycasting.testPointToPoint(position, farAway, null, 16); // теперь тестируем точку до точки - пересечается с объектами [16]

    if (hitData && hitData.entity && hitData.entity.type === "vehicle") {
        player.outputChatBox(hitData.entity);
    } else {
        player.outputChatBox("No.");
    }
});