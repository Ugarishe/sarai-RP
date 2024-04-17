require('./noclip');

require('./MoveSkyCamera');

require('./GMenu');

require('./Respawn');




require('./LogRegMenu');





mp.events.add('render', () => {
    const camPos = mp.players.local.getBoneCoords(12844, 0, 0, 0);
    const camRot = mp.game.cam.getGameplayCamRot(2);

    const posX = camPos.x.toFixed(2);
    const posY = camPos.y.toFixed(2);
    const posZ = camPos.z.toFixed(2);
    const rotX = camRot.x.toFixed(2);
    const rotY = camRot.y.toFixed(2);
    const rotZ = camRot.z.toFixed(2);

    const text = `Camera Position: (${posX}, ${posY}, ${posZ})\nCamera Rotation: (${rotX}, ${rotY}, ${rotZ})`;

    mp.game.graphics.drawText(text, [0.01, 0.9], {
        font: 0,
        color: [255, 255, 255, 255],
        scale: [0.5, 0.5],
        outline: true
    });
});






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

const skinSettings = {
    "bGender": true,
    "MotherBlend": 21,
    "FatherBlend": 21,
    "BlendShape": 0.5,
    "BlendSkin": 0.5,
    "HairColour": 0,
    "HairHighlight": 0,
    "Hair": 2
};

mp.events.add('client:setSkinSetting', (code, parameters) => {
    skinSettings[code] = parameters;
    set()
});

function set(){
    mp.events.callRemote('setskins', skinSettings["bGender"], skinSettings["MotherBlend"], skinSettings["FatherBlend"], 
        skinSettings["BlendShape"], skinSettings["BlendSkin"], skinSettings["HairColour"], skinSettings["HairHighlight"], skinSettings["Hair"]);
}

let ifGod = false
mp.events.add('client:god', () => {
    ifGod = !ifGod;
    mp.players.local.setInvincible(ifGod);
    if(ifGod){
        mp.game.graphics.notify('GOD ~g~Включён');
    }else{
        mp.game.graphics.notify('GOD ~r~Выключен');
    }
});

// mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
//     mp.game.graphics.notify(`Damage ~r~${damage} in ${boneIndex}`);
// });

// mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
//     if (targetEntity.type === 'player' && boneIndex === 20) {
//         mp.game.graphics.notify(`Head`);
//         return 1; // disable outgoing headshot damage
//     }
// });

const {
    ignoreWeapons,
    damageWeapons,
    damageWeaponGroups
} = require('./settings.js');

// The value from this range will determine what percentage of the original damage will be cut
const defaultPercent = {
    max: 85,
    min: 60
}

const randomInt = (min, max) => Math.random() * (max - min) + min;

mp.events.add("clone", () => {
    let ped = mp.peds.new(mp.joaat('s_m_y_cop_01'), player.position, 0, () => {
        // Клонировать игрока к педу
        player.clone(0, ped.networkId, ped.handle);
    });
})

mp.events.add("incomingDamage", (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if (targetEntity.type === "player" && sourcePlayer && !(weapon in ignoreWeapons)) {
        if (global.adminGodMode) {
            return true;
        }

        let max = defaultPercent.max;
        let min = defaultPercent.max;

        const weaponGroupHash = mp.game.weapon.getWeapontypeGroup(weapon);
        if (weapon in damageWeapons) {
            max = damageWeapons[weapon].max;
            min = damageWeapons[weapon].min;
        } else if (weaponGroupHash in damageWeaponGroups) {
            max = damageWeaponGroups[weaponGroupHash].max;
            min = damageWeaponGroups[weaponGroupHash].min;
        }

        const percent = randomInt(min, max) / 100;
        let customDamage = damage - (damage * percent);

        // Check for a hit in the head. A hit to the head carries with it much more damage than on other points of the body.
        if (boneIndex === 18 || boneIndex === 16) {
            customDamage = 40;
        }

        targetEntity.applyDamageTo(parseInt(customDamage), true);
        mp . gui.chat . push ( `hash: ${ customDamage}  `) ;  

        const currentHealth = targetEntity.getHealth();

        // This check is necessary in order for the "PlayerDeath" event to be triggered if the player died after taking damage
        if (currentHealth > 0) {
            // Setting the initial damage received in the event to 0
            mp.game.weapon.setCurrentDamageEventAmount(0);
        }
    }
})