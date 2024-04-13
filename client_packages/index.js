require('./noclip');

require('./MoveSkyCamera');

require('./GMenu');

require('./Respawn');

mp.gui.chat.show(false); //Disables default RageMP Chat
const chat = mp.browsers.new('package://advanced-chat/index.html');
chat.markAsChat();

let ifEsp = false;

mp.events.add('render', () => {
    if(ifEsp){
        pos = mp.players.local.getCoords(true);
        mp.players.forEach((player) => {
            if(player !== mp.players.local){
                posTargetPlayer = player.getCoords(true);
                mp.game.graphics.drawLine(pos.x, pos.y, pos.z-0.8, posTargetPlayer.x, posTargetPlayer.y, posTargetPlayer.z-0.8, 255, 0, 0, 255);
            }
        });
    }
});

mp.events.add('drawRedRaycast', () => {
    if(ifEsp){
        mp.game.graphics.notify('ESP ~r~Выключен');
    }else{
        mp.game.graphics.notify('ESP ~g~Включён');
    }
    ifEsp = !ifEsp;
});

const skinSettings = new Map([
    ["bGender", true],
    ["MotherBlend", 21],
    ["FatherBlend", 21],
    ["BlendShape", 0.5],
    ["BlendSkin", 0.5], 
    ["HairColour", 0],
    ["HairHighlight", 0]
]);

mp.events.add('client:setSkinSetting', (code, parameters) => {
    skinSettings.set(code, parameters);
    
    // Вызов удалённого события с использованием значений из словаря
    mp.events.callRemote('setskins', 
        skinSettings.get("bGender"), 
        skinSettings.get("MotherBlend"), 
        skinSettings.get("FatherBlend"), 
        skinSettings.get("BlendShape"), 
        skinSettings.get("BlendSkin"), 
        skinSettings.get("HairColour"), 
        skinSettings.get("HairHighlight")
    );
});