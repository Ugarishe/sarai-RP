let RespawnInterfase;

mp.events.add("client:Respawn:showRespwnInterfase", () => {
    RespawnInterfase = mp.browsers.new("package://Respawn/index.html");
    mp.game.graphics.startScreenEffect("DeathFailMPIn",0,true);
    RespawnInterfase.execute("mp.invoke('focus', true)");
    mp.gui.cursor.show(true, true);
    mp.game.gameplay.setFadeOutAfterDeath(false);
});

mp.events.add('respawn',() =>{
    mp.game.graphics.stopScreenEffect("DeathFailMPIn");
    RespawnInterfase.execute("mp.invoke('focus', false)");
    RespawnInterfase.active = false
    RespawnInterfase = null;
    mp.events.callRemote('spawnInPosition', mp.players.local);
});