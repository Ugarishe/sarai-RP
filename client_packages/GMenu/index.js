let aimСursor, touchObject, saveObject, GMenuPlayer, GMenuVehicle;

mp.keys.bind(0xC0, true, function() { // 0xC0 - это код клавиши "backtick"
    if(GMenuPlayer){
        mp.game.graphics.stopScreenEffect("BeastLaunch");
        GMenuPlayer.execute("mp.invoke('focus', false)");
        GMenuPlayer.active = false
        GMenuPlayer = null;
        saveObject = null;
    }
    if(GMenuVehicle){
        mp.game.graphics.stopScreenEffect("BeastLaunch");
        GMenuVehicle.execute("mp.invoke('focus', false)");
        GMenuVehicle.active = false
        GMenuVehicle = null;
        saveObject = null;
    }
    mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible); // Показываем или скрываем курсор в зависимости от значения переменной cursorVisible

});

mp.events.add("client:GMenu:startInterfase", () => {
    mp.game.ui.displayHud(false);
    aimСursor = mp.browsers.new("package://aimCursor.html");
});

setInterval(() => {
    // Получаем массив всех игроков на сервере
    const players = mp.players.toArray();
    // Выводим количество игроков в консоль
    aimСursor.execute(`updatePlayerCount(${players.length});`);
}, 5000);

// Создание интерфейса для отображения квадратика
mp.events.add("render", () => {
    touchObject = pointingAt(8); // Проверяем направление камеры

    // Отображение квадратика, если игрок смотрит на машину
    if (touchObject) {
        aimСursor.execute(`changeLineColor(true);`); // Вызываем функцию showSquare() в HTML для отображения квадратика
    }
    else{
        aimСursor.execute(`changeLineColor(false);`);
    }
});

// Функция для проверки, направлена ли камера на объект
function pointingAt(distance) {
    const camera = mp.cameras.new("gameplay"); // Получаем текущую камеру геймплея

    const position = camera.getCoord(); // Получаем координаты камеры
    const direction = camera.getDirection(); // Получаем направление камеры

    // Вычисляем конечную точку для проверки
    const farAway = new mp.Vector3(
        direction.x * distance + position.x,
        direction.y * distance + position.y,
        direction.z * distance + position.z
    );

    // Проверяем, есть ли объект на пути камеры
    const hitData = mp.raycasting.testPointToPoint(position, farAway, [1, 16]);

    // Если есть объект и это машина, возвращаем машину, иначе возвращаем null
    if (hitData && hitData.entity && hitData.entity !== mp.players.local && (hitData.entity.type === "vehicle" || hitData.entity.type === "player")) {
        return hitData.entity;
    } else {
        return null;
    }
};

mp.keys.bind(0x47, true, function() {

    if(touchObject){
        if(touchObject.type === "vehicle"){
            saveObject = touchObject
            GMenuVehicle = mp.browsers.new("package://GMenu/GMenuVehicle.html");
            mp.game.graphics.startScreenEffect("BeastLaunch",0,true);
            GMenuVehicle.execute("mp.invoke('focus', true)");
            mp.gui.cursor.show(true, true);
        }
        if(touchObject.type === "player" && !GMenuPlayer){
            saveObject = touchObject
            GMenuPlayer = mp.browsers.new("package://GMenu/GMenuPlayer.html");
            mp.game.graphics.startScreenEffect("BeastLaunch",0,true);
            GMenuPlayer.execute("mp.invoke('focus', true)");
            mp.gui.cursor.show(true, true);
        }
    }

});

mp.events.add('playerKIll',() =>{
    mp.game.graphics.stopScreenEffect("BeastLaunch");
    GMenuPlayer.execute("mp.invoke('focus', false)");
    GMenuPlayer.active = false
    GMenuPlayer = null;
    saveObject = null;
});

mp.events.add('vehicleDelete',() =>{
    mp.events.callRemote("delateVehicle", saveObject);
    mp.game.graphics.stopScreenEffect("BeastLaunch");
    GMenuVehicle.execute("mp.invoke('focus', false)");
    GMenuVehicle.active = false
    GMenuVehicle = null;
    saveObject = null;
});