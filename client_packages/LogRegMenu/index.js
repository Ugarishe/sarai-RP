var localPlayer = mp.players.local;
var sceneryCamera, LogRegWeb;

mp.events.add('client:showLogRegMenu', function() {
    sceneryCamera = mp.cameras.new('default', new mp.Vector3(2636.6, 1504.7, 107), new mp.Vector3(-22.33, 0.00, -84.58), 40);
    sceneryCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.dimension = 100000 + localPlayer.id;
    localPlayer.freezePosition(true);
    mp.game.ui.displayCash(false);
    mp.game.ui.displayHud(false);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);

    mp.game.graphics.startScreenEffect("DeathFailMPDark",0,true);

    LogRegWeb = mp.browsers.new("package://LogRegMenu/webpage/index.html");
    LogRegWeb.execute("mp.invoke('focus', true)");
    mp.gui.cursor.show(true, true);
});

mp.events.add('client:closeLogRegMenuAndSpawn', function() {
    localPlayer.name = localPlayer.socialClub;
    mp.events.callRemote('spawnInPosition');
    localPlayer.freezePosition(false);
    mp.game.ui.displayCash(true);
    mp.game.ui.displayHud(true);
    mp.game.ui.displayRadar(true);
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    
    setTimeout(() => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        localPlayer.freezePosition(false);
        localPlayer.setVisible(true, false);
        localPlayer.setCollision(true, false);
        sceneryCamera.destroy(true);
        sceneryCamera = null;

        mp.game.graphics.stopScreenEffect("DeathFailMPDark");
        LogRegWeb.execute("mp.invoke('focus', false)");
        LogRegWeb.active = false
        LogRegWeb = null;
    }, 100);
});